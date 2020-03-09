const attributesMaster = ["name","strength","dexterity","constitution","intelligence","wisdom","charisma"];

function Colonist(attributes){ 
    this.name = attributes.name;
    this.strength = attributes.strength;
    this.dexterity = attributes.dexterity;
    this.constitution = attributes.constitution;
    this.intelligence = attributes.intelligence;
    this.wisdom = attributes.wisdom;
    this.charisma = attributes.charisma;
 } 

$('#create-colonist').click(
    createColonist
)

function createColonist() {
    let attributes = {};
    for (let i of attributesMaster)
        attributes[i] = $('#' + i + '-input').val();
    let newColonist = new Colonist(attributes);
    $('#colonist-list').append('<li>' + newColonist.name + '</li>');
    console.log(newColonist)
}