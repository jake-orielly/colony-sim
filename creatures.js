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
        this.inventory = [];
    }

    render() {
        placeToken(this);
    }
}

class BerryBush extends Entity {
    constructor(y,x) {
        super({
            name:'berry_bush',
            y:y,
            x:x,
            token:"B",
        })
    }
}

class Home extends Entity{
    constructor(y,x) {
        super({
            name:'home',
            y:y,
            x:x,
            token:"H",
        })
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
        this.token = "@";
        this.inventory = [];
        this.goals = [
            {
                target:BerryBush,
                func:this.gather,
                parent:this
            },
            {
                target:Home,
                func:this.deposit,
                parent:this
            }
        ];
        this.currGoal = 0;
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
        let goal = this.locate(this.goals[this.currGoal].target);

        if (!goal) {
            placeToken(this);
            return;
        }

        let goalY = goal[0];
        let goalX = goal[1];
        let nextMove;
        if (this.distanceTo(goalY,goalX) > 1) {
            nextMove = this.getNextMove(goalY,goalX);
            placeToken(new BlankSpace(this.y,this.x));
            this.y = nextMove[0];
            this.x = nextMove[1];
            placeToken(this)
        }
        else {
            placeToken(this);
            this.goals[this.currGoal].func(goalY,goalX)
        }
    }

    gather(y,x) {
        this.parent.inventory.push("berry");
        $("#creature-holding span").html(this.parent.inventory.length);
        if (this.parent.inventory.length > 4)
            this.parent.completeCurrGoal();
    }

    deposit(y,x) {
        this.parent.inventory.pop();
        homeInventory.berries++;
        $("#creature-holding span").html(this.parent.inventory.length);
        $("#creature-home span").html(homeInventory.berries);
        if (this.parent.inventory.length == 0)
            this.parent.completeCurrGoal();
    }

    completeCurrGoal() {
        this.currGoal++;
        this.currGoal %= this.goals.length;
        this.target = this.goals[this.currGoal].target;
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
                if (onBoard(newY,newX) && (arenaBoard[newY][newX] instanceof BlankSpace || (newY == this.y && newX == this.x))) {
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
        let searched = {};
        let toSearch = [];
        let curr, newY, newX;
        toSearch.push([this.y,this.x]);
        while (toSearch.length) {
            curr = toSearch.pop();
            if (arenaBoard[curr[0]][curr[1]] instanceof target)
                return curr;
            else {
                for (let i of cardinalDirs) {
                    newY = curr[0] + i[0];
                    newX = curr[1] + i[1];
                    if (onBoard(newY,newX) && !searched[newY + "," + newX]) {
                        toSearch.push([newY,newX]);
                        searched[newY + "," + newX] = 1;
                    }
                }
            }
        }

        return undefined;
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