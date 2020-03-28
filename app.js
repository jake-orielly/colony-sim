let inventory = {};

function start() {
    let knight = new Knight();
    let bandit = new Bandit();
}

let skills = {};
skills.mining = new Skill({name:'mining'});

function gatherBerry() {
    new Berry().create();
}

function mineIron() {
    new IronOre().create();
}

function mineCoal() {
    new Coal().create();
}

function smeltIron() {
    new IronIngot().smelt();
}

function smeltSteel() {
    new SteelIngot().smelt();
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