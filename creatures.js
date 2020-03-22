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
}