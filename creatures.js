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
        this.strength = attributes.strength;
        this.dexterity = attributes.dexterity;
        this.constitution = attributes.constitution;
        this.intelligence = attributes.intelligence;
        this.wisdom = attributes.wisdom;
        this.charisma = attributes.charisma;
        this.hp = this.maxHP();
        this.y = attributes.y;
        this.x = attributes.x;
        this.target = BerryBush;
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
        return this.constitution * 4;
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

    move() {
        if (this.goalY == undefined || !this.reaffirmGoal()) {
            let newGoalLoc = this.locate(this.currGoal.target);
            this.goalY = newGoalLoc.y;
            this.goalX = newGoalLoc.x;
        }

        if (this.goalY == undefined) {
            placeToken(this);
            return;
        }

        let nextMove;
        if (this.distanceTo(this.goalY,this.goalX) > 1) {
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
        if (!arenaBoard[this.goalY][this.goalX] instanceof this.currGoal.target)
            return false;
    }

    gather(y,x) {
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
                if (arenaBoard[i][j] instanceof target &&
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

class Bandit extends Creature {
    constructor(y,x,token) {
        super({
            name:'bandit',
            y:y,
            x:x,
            token:token,
            strength: 11,
            dexterity: 12,
            constitution: 12,
            intellegence: 10,
            wisdom: 10,
            charisma: 10,
            equipment: [
                new Shortsword(),
                new Shortbow(),
                new LeatherJerkin(),
                new Boots()
            ]
        })
        this.goals = {
            gather: function(creature,resource) {
                return {
                    target:resource,
                    func:creature.gather,
                    completeCondition:() => {
                        return creature.inventoryTotal() >= 5;
                    },
                    parent:creature,
                    nextGoal:() => { return creature.goals.returnItems}
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
            }
        }
        this.goals.retrieveIron.nextGoal = () => { return this.goals.smeltIron};
        this.goals.smeltIron.nextGoal = () => { return this.goals.returnItems};
        this.goals.returnItems.nextGoal = () => {
            let split1 = playerSetGoal.split("_")[1];
            let resourceNodeMap = {
                'berries': BerryBush,
                'iron': IronVein,
                'coal': CoalVein,
                'flax': FlaxPlant,
                'pine': PineTree,
                'oak': OakTree,
            }
            return this.goals.gather(this,resourceNodeMap[split1]);
            //return (home.inventory.iron_ore.amount <= 9 ? this.goals.gather(this,IronVein) : this.goals.retrieveIron);
        };
        this.currGoal = this.goals.gather(this,BerryBush);
    }
}

class Knight extends Creature {
    constructor(y,x,token) {
        super({
            name:'knight',
            strength: 16,
            dexterity: 11,
            constitution: 14,
            intellegence: 11,
            wisdom: 11,
            charisma: 15,
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