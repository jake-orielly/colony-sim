let inventory = {};

function start() {
    let knight = new Knight();
    let bandit = new Bandit();
    renderSkillsList();
}

function gather(Item) {
    new Item().create();
}

function craft(Item) {
    console.log(new Item)
    console.log(new Item().craft)
    new Item().craft();
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
        $('#skills-list').append('<li id="' + i + '-skill"></li>');
        $('#skills-list li:last').append('<div>' + prettyPrint(i) + ':' + '</div>');
        $('#skills-list div:last').append('<span class="level-text">1</span>');
        $('#skills-list li:last').append('<div class="skill-outer"></div>');
        $('#skills-list div:last').append('<div class="skill-inner"></div>');
    }
}