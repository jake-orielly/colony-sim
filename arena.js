let rows = 11;
let cols = 11;
let creatures = [];
let arenaBoard = [];
let blankToken = ".";
let berryBush = "B";
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
    placeToken(9,10,berryBush)

    creatures.push(new Bandit(2,2,'@'));

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
