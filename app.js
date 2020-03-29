let inventory = {};

let skills = {};
skills.foraging = new Skill({name:'foraging'});
skills.mining = new Skill({name:'mining'});
skills.smithing = new Skill({name:'smithing'});

function start() {
    let knight = new Knight();
    let bandit = new Bandit();
    renderSkillsList();
}

function gatherBerry() {
    new Berry().create();
}

function gatherMushroom() {
    new Mushroom().create();
}

function mineIron() {
    new IronOre().create();
}

function mineCoal() {
    new Coal().create();
}

function craft(item) {
    new item().craft();
}

function renderInventory() {
    let invTable = $('#inventory-table tbody');
    let currRow;
    invTable.empty();

    for (let i in inventory) {
        invTable.append('<tr></tr>')
        currRow = invTable.find('tr:last');
        currRow.append('<td>' + prettyPrint(inventory[i].item.name) + ':</td>')
        currRow.append('<td>' + inventory[i].amount + '</td>')
    }
}

function renderSkillsList() {
    for (let i in skills ) {
        console.log(i)
        $('#skills-list').append('<li id="' + i + '-skill"></li>');
        $('#skills-list li:last').append('<div>' + prettyPrint(i) + ':' + '</div>');
        $('#skills-list div:last').append('<span class="level-text">1</span>');
        $('#skills-list li:last').append('<div class="skill-outer"></div>');
        $('#skills-list div:last').append('<div class="skill-inner"></div>');
    }
}