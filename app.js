const attributesMaster = ["name","strength","dexterity","constitution","intelligence","wisdom","charisma"];
let creatures = [];
function Creature(attributes){ 
    this.name = attributes.name;
    this.strength = attributes.strength;
    this.dexterity = attributes.dexterity;
    this.constitution = attributes.constitution;
    this.intelligence = attributes.intelligence;
    this.wisdom = attributes.wisdom;
    this.charisma = attributes.charisma;

    this.maxHP = function() {
        return this.constitution * 4;
    }

    this.hp = this.maxHP();

    this.takeDamage = function(damage) {
        this.hp -= damage;
        if (this.hp <= 0)
            this.die();
    }

    this.die = function() {
        console.log(this.name + ' is dead.')
    }

    this.attack = function(target) {
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