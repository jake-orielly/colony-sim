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
        console.log(this.name + ' is dead.')
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
}

class Knight extends Creature {
    constructor() {
        super({
            name:'Knight',
            strength: 16,
            dexterity: 11,
            constitution: 14,
            intellegence: 11,
            wisdom: 11,
            charisma: 15,
            hp: 52,
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