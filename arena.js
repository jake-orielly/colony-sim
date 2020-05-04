let rows = 11;
let cols = 11;
let creatures = [];
let arenaBoard = [];
let blankToken = ".";
let berryBush = "B";
let home = "H";
let homeInventory = {
    berries: 0
}
function start() {
    for (let y = 0; y < cols; y++) {
        arenaBoard[y] = [];
        $("#arena-board").append("<tr></tr>")
        for (let x = 0; x < cols; x++) {
            arenaBoard[y][x] = blankToken;
            $("#arena-board tr:last").append('<td id="cell-' + x + '-' + y + '">' + blankToken + '</td>')
        }
    }

    placeToken(8,10,'#')
    placeToken(8,9,'#')
    placeToken(10,10,'#')
    placeToken(10,6,'#')
    placeToken(9,6,'#')
    placeToken(8,6,'#')
    placeToken(7,6,'#')
    placeToken(6,6,'#')
    placeToken(6,7,'#')
    placeToken(6,8,'#')
    placeToken(6,9,'#')
    placeToken(8,8,'#')
    placeToken(3,9,'#')
    placeToken(4,9,'#')
    placeToken(5,9,'#')
    placeToken(9,10,berryBush)
    placeToken(2,2,home)

    creatures.push(new Bandit());

    gameTick = setInterval(() => {
        for (let i of creatures)
            i.move();
    },200)
}

function placeToken(y,x,token) {
    arenaBoard[y][x] = token;
    $("#cell-" + y + "-" + x).html(token);
}

function onBoard(y,x) {
    return (y >= 0 && y < cols && x >= 0 && x < rows);
}
