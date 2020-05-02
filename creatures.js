const attributesMaster = ["name","strength","dexterity","constitution","intelligence","wisdom","charisma"];

class Creature { 
    constructor(attributes) {
        this.name = attributes.name;
        this.strength = attributes.strength;
        this.dexterity = attributes.dexterity;
        this.constitution = attributes.constitution;
        this.intelligence = attributes.intelligence;
        this.wisdom = attributes.wisdom;
        this.charisma = attributes.charisma;
        this.hp = this.maxHP();
        this.x = 2;
        this.y = 2;
        this.direction = [0,1]
        this.token = "#";
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
        let newX = this.x + this.direction[1];
        let newY = this.y + this.direction[0];
        if (onBoard(newX, newY) && arenaBoard[newY][newX] == blankToken) {
            placeToken(this.x,this.y,blankToken)
            this.y += this.direction[0];
            this.x += this.direction[1];
            placeToken(this.x,this.y,this.token)
        }
        else {
            this.direction[1] = 0;
            this.direction[0] = 0;
            this.direction[parseInt(Math.random() * 2)] = (parseInt(Math.random() * 2) ? 1  : -1);
        }
    }
}

class Bandit extends Creature {
    constructor() {
        super({
            name:'bandit',
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
    constructor() {
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