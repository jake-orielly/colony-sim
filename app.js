const attributesMaster = ["name","strength","dexterity","constitution","intelligence","wisdom","charisma"];
let colonists = [];
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

$('#create-colonist').click(
    createColonist
)

function createColonist() {
    let attributes = {};
    for (let i of attributesMaster)
        attributes[i] = $('#' + i + '-input').val();
    let newColonist = new Creature(attributes);
    colonists.push(newColonist);
    $('#colonist-list').append('<li>' + newColonist.name + '</li>');
    console.log(newColonist)
}