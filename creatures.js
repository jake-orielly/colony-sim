const attributesMaster = ["name","strength","dexterity","constitution","intelligence","wisdom","charisma"];

class BlankSpace {
    constructor(y,x) {
        this.y = y;
        this.x = x;
        this.token = blankToken;
    }
}

class Entity {
    constructor(attributes) {
        this.name = attributes.name;
        this.y = attributes.y;
        this.x = attributes.x;
        this.token = attributes.token;
        this.inventory = {};
        this.maxInventory = 20;
    }

    addItem(item,amount = 1) {
        if (this.inventory[item])
            this.inventory[item].amount += amount;
        else
            this.inventory[item] = {item:item,amount:amount};
    }

    removeItem(item,amount = 1) {
        if (!this.inventory[item] || this.inventory[item].amount < amount)
            return false;
        else {
            if (this.inventory[item].amount == amount)
                delete this.inventory[item];
            else {
                this.inventory[item].amount -= amount;
            }   
            return true;
        }
    }

    takeItem(item,amount,target) {
        let removed = target.removeItem(item,amount);
        if (removed)
            this.addItem(item,amount);
        return removed;
    }

    render() {
        placeToken(this);
    }

    inventoryTotal() {
        let total = 0;
        for (let i in this.inventory)
            total += this.inventory[i].amount;
        return total;
    }
}

class Creature extends Entity{ 
    constructor(attributes) {
        super(attributes)
        this.attr = attributes.attr;
        this.hp = this.maxHP();
        this.y = attributes.y;
        this.x = attributes.x;
        this.target = undefined;
        this.token = attributes.token;
        this.goals = {};
        this.goalY = undefined;
        this.goalX = undefined;
        if (attributes.equipment)
            this.equipment = attributes.equipment;
        else
            this.equipment = [];
    }

    maxHP() {
        return this.attr.constitution * 4;
    }

    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0)
            this.die();
    }

    die() {
        console.log(prettyPrint(this.name) + ' is dead.')
    }

    attack(target) {
        target.takeDamage(this.strength);
    }

    getAC() {
        let total = 0;
        for (let i of this.equipment)
            if (i instanceof Armor)
                total += i.armorBonus;
        return total;
    }

    act() {
        if (this.goalY == undefined) {
            if (Array.isArray(this.currGoal.target)) {
                this.goalY = this.currGoal.target[0];
                this.goalX = this.currGoal.target[1];
            }
            else {
                let newGoalLoc = this.locate(this.currGoal.target);
                this.goalY = newGoalLoc.y;
                this.goalX = newGoalLoc.x;
            }
        }

        if (this.goalY && !this.reaffirmGoal()) 
            this.completeCurrGoal();

        if (this.goalY == undefined) {
            placeToken(this);
            this.completeCurrGoal();
            return;
        }

        let nextMove;
        if (
            // moveTo and gather cases
            (Array.isArray(this.currGoal.target) && this.distanceTo(this.goalY,this.goalX) > this.currGoal.tolerance) || 
            // all other cases
            (!Array.isArray(this.currGoal.target) && this.distanceTo(this.goalY,this.goalX) > 1)) {
            nextMove = this.getNextMove(this.goalY,this.goalX);
            placeToken(new BlankSpace(this.y,this.x));
            this.y = nextMove[0];
            this.x = nextMove[1];
            placeToken(this)
        }
        else {
            placeToken(this);
            this.currGoal.func(this.goalY,this.goalX,this.currGoal.funcArgs);
            if (this.currGoal.completeCondition())
                this.completeCurrGoal();
        }
    }

    // Confirm our goal is still where we think it is
    reaffirmGoal() {
        if (Array.isArray(this.currGoal.target))
            if (this.currGoal.name.split("_")[0] == "gather" && !(arenaBoard[this.goalY][this.goalX] instanceof ResourceNode)) {
                console.log(1)
                return false;
            }
            else
                return true;
        if (!arenaBoard[this.goalY][this.goalX] instanceof this.currGoal.target)
            return false;
    }

    setGoal(goal) {
        this.goalY = undefined;
        this.goalX = undefined;
        this.currGoal = goal;
    }

    gather(y,x) {
        if (arenaBoard[y][x] instanceof ResourceNode)
            this.parent.takeItem(Object.keys(arenaBoard[y][x].inventory)[0],1,arenaBoard[y][x]);
    }

    getItem(x,y,item) {
        this.parent.takeItem(item,1,arenaBoard[y][x]);
    }

    deposit(y,x) {
        arenaBoard[y][x].takeItem(Object.keys(this.parent.inventory)[0],1,this.parent)
        renderInventory();
    }

    completeCurrGoal() {
        this.currGoal = this.currGoal.nextGoal();
        this.target = this.currGoal.target;
        this.goalY = undefined;
        this.goalX = undefined;
    }

    // This doesn't take into account actual distance travel
    distanceTo(y,x) {
        return Math.abs(this.y - y) + Math.abs(this.x - x);
    }

    getPathTo(y,x) {
        let pathSpace = [];
        let toExpand = [];
        let curr, newY, newX;
        for (let i = 0; i < cols; i++) {
            pathSpace[i] = [];
            for (let j = 0; j < rows; j++)
                pathSpace[i][j] = undefined;
        }
        pathSpace[y][x] = 0;
        toExpand.push([y,x]);
        while (toExpand.length) {
            curr = toExpand.pop();
            for (let i of cardinalDirs) {
                newY = curr[0] + i[0];
                newX = curr[1] + i[1];
                if (onBoard(newY,newX) && 
                    (this.isPathable(arenaBoard[newY][newX]) || (this.y == newY && this.x == newX))) {
                    if (pathSpace[newY][newX] == undefined ||
                        pathSpace[curr[0]][curr[1]] + 1 < pathSpace[newY][newX]) {
                        pathSpace[newY][newX] = pathSpace[curr[0]][curr[1]] + 1;
                        toExpand.unshift([newY,newX]);
                    }
                }
            }
        }
        return pathSpace;
    }

    getNextMove(y,x) {
        let newY, newX;
  
        let pathSpace = this.getPathTo(y, x);
    
        //If we can't find a path to the target, don't move
        if (pathSpace[this.y][this.x] == undefined)
            return [this.y,this.x];
        
            let nextMove = undefined;

        for (let i of cardinalDirs) {
            newY = this.y + i[0];
            newX = this.x + i[1];

            if (onBoard(newY,newX) && pathSpace[newY][newX] != undefined && (
                nextMove == undefined ||
                pathSpace[newY][newX] < pathSpace[nextMove[0]][nextMove[1]]
            ))
                nextMove = [newY,newX];
        }
        console.log(nextMove)
        return nextMove;
    }

    locate(target) {
        let pathSpace = [];
        let toExpand = [];
        let curr, newY, newX;
        let best = -1;
        let result = {y:undefined,x:undefined};
        for (let i = 0; i < cols; i++) {
            pathSpace[i] = [];
            for (let j = 0; j < rows; j++)
                pathSpace[i][j] = undefined;
        }
        pathSpace[this.y][this.x] = 0;
        toExpand.push([this.y,this.x]);

        while (toExpand.length) {
            curr = toExpand.pop();
            for (let i of cardinalDirs) {
                newY = curr[0] + i[0];
                newX = curr[1] + i[1];
                if (onBoard(newY,newX) && (arenaBoard[newY][newX].token != "#")) {
                    if (pathSpace[newY][newX] == undefined ||
                        pathSpace[curr[0]][curr[1]] + 1 < pathSpace[newY][newX]) {
                        pathSpace[newY][newX] = pathSpace[curr[0]][curr[1]] + 1;
                        toExpand.unshift([newY,newX]);
                    }
                }
            }
        }
        
        for (let i = 0; i < cols; i++) 
            for (let j = 0; j < rows; j++)
                if (target && arenaBoard[i][j] instanceof target &&
                    (best == -1 || pathSpace[i][j] < best)) {
                        best = pathSpace[i][j];
                        result.y = i;
                        result.x = j;
                    }
        return result;
    }

    isPathable(cell) {
        return ["."].indexOf(cell.token) != -1;
    }
}

class Character extends Creature {
    constructor(attributes) {
        super(attributes)
        this.skills = {
            'woodcutting': new Skill({name:'woodcutting'}),
            'mining': new Skill({name:'mining'}),
            'smithing': new Skill({name:'smithing'})
        }
    }
}

class Bandit extends Character {
    constructor(y,x,token) {
        super({
            name:'bandit',
            y:y,
            x:x,
            token:token,
            attr: {
                strength: 11,
                dexterity: 12,
                constitution: 12,
                intellegence: 10,
                wisdom: 10,
                charisma: 10,
            },
            equipment: [
                new Shortsword(),
                new Shortbow(),
                new LeatherJerkin(),
                new Boots()
            ]
        }),
        this.goals = {
            moveTo: function(creature,y,x) {
                return {
                    target:[y,x],
                    func:() => {return},
                    // creature moves to nearest tile within tolerance of goal
                    tolerance: 0,
                    completeCondition:() => {
                        return creature.distanceTo(creature.goalY,creature.goalX) == this.tolerance;
                    },
                    parent:creature,
                    name:"moveto_" + y + "_" + x,
                    nextGoal: () => { return creature.goals.idle}
                }
            },
            gather: function(creature,y,x) {
                return {
                    target:[y,x],
                    func:creature.gather,
                    tolerance: 1,
                    completeCondition:() => {
                        return creature.inventoryTotal() >= creature.maxInventory;
                    },
                    parent:creature,
                    name:"gather_" + arenaBoard[y][x].name,
                    nextGoal:() => { return creature.goals.idle}
                }
            },
            // unfinished
            craft: function(creature,resource) {
                return {
                    target:resource,
                    func:creature.craftItem,
                    completeCondition:() => {
                        return creature.inventoryTotal() >= 5;
                    },
                    parent:creature,
                    name:"craft_" + (new resource()).name,
                    nextGoal:() => { return creature.goals.idle}
                }
            },
            retrieveIron: {
                target:Home,
                func:this.getItem,
                funcArgs:"iron_ore",
                completeCondition:() => {
                    return this.inventoryTotal() >= 5;
                },
                parent:this
            },
            smeltIron: {
                target:Forge,
                func:this.deposit,
                completeCondition:() => {
                    return this.inventoryTotal() <= 0;
                },
                parent:this,
            },
            returnItems: {
                target:Home,
                func:this.deposit,
                completeCondition:() => {
                    return this.inventoryTotal() <= 0;
                },
                parent:this,
            },
            idle: {
                target:undefined,
                func: () => {return},
                funcArgs:"",
                completeCondition:() => {
                    return true
                },
                name:"idle",
                parent:this
            }
        }
        this.goals.retrieveIron.nextGoal = () => { return this.goals.smeltIron};
        this.goals.smeltIron.nextGoal = () => { return this.goals.returnItems};
        this.goals.idle.nextGoal = () => { return this.goals.idle};
        this.goals.returnItems.nextGoal = () => { return this.goals.idle};
        this.currGoal = this.goals.idle;
    }
}

class Knight extends Creature {
    constructor(y,x,token) {
        super({
            name:'knight',
            attr: {
                strength: 16,
                dexterity: 11,
                constitution: 14,
                intellegence: 11,
                wisdom: 11,
                charisma: 15,
            },
            equipment: [
                new Greatsword(),
                new HeavyCrossbow(),
                new Breastplate(),
                new Platelegs(),
                new Greathelm(),
                new Gauntlets(),
                new Boots()
            ]
        })
    }
}

function renderInventory() {
    $("#inventory-items").empty();
    for (let i in home.inventory)
        $("#inventory-items").append("<p>" + prettyPrint(i) + ": " + home.inventory[i].amount)
}