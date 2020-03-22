let inventory = {};

function start() {
    let knight = new Knight();
    let bandit = new Bandit();
}

function gatherBerry() {
    new Berry().addToInventory();
}

function mineIron() {
    new IronOre().addToInventory();
}

function mineCoal() {
    new Coal().addToInventory();
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