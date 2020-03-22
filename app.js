let inventory = [];

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

function renderInventory() {
    let invTable = $('#inventory-table tbody');
    let currRow;
    invTable.empty();

    for (let i of inventory) {
        invTable.append('<tr></tr>')
        currRow = invTable.find('tr:last');
        currRow.append('<td>' + i.item.name + ':</td>')
        currRow.append('<td>' + i.amount + '</td>')
    }
}