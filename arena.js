let rows = 7;
let cols = 7;
let creatures = [];
let arenaBoard = [];
let blankToken = ".";
function start() {
    for (let y = 0; y < cols; y++) {
        arenaBoard[y] = [];
        $("#arena-board").append("<tr></tr>")
        for (let x = 0; x < cols; x++) {
            arenaBoard[y][x] = blankToken;
            $("#arena-board tr:last").append('<td id="cell-' + x + '-' + y + '">' + blankToken + '</td>')
        }
    }

    placeToken(3,3,"B")

    creatures.push(new Bandit());
    creatures.push(new Bandit());
    creatures[1].x -= 2;

    gameTick = setInterval(() => {
        for (let i of creatures)
            i.move();
    },100)
}

function placeToken(x,y,token) {
    arenaBoard[y][x] = token;
    $("#cell-" + x + "-" + y).html(token);
}

function onBoard(x,y) {
    return (x >= 0 && x < rows && y >= 0 && y < rows);
}
