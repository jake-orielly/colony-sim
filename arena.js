let rows = 11;
let cols = 11;
let entities = [];
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

    newWall(8,10,'#')
    newWall(8,9,'#')
    newWall(10,10,'#')
    newWall(10,6,'#')
    newWall(9,6,'#')
    newWall(8,6,'#')
    newWall(7,6,'#')
    newWall(6,6,'#')
    newWall(6,7,'#')
    newWall(6,8,'#')
    newWall(6,9,'#')
    newWall(8,8,'#')

    entities.push(new Bandit(2,2,'@'));
    entities.push(new BerryBush(9,10));
    gameTick = setInterval(() => {
        for (let i of entities) {
            if (i instanceof Creature)
                i.move();
            else
                i.render();
        }
    },200)
}

function placeToken(entity,blank) {
    let x = entity.x;
    let y = entity.y;
    let token = entity.token;
    arenaBoard[y][x] = entity;
    $("#cell-" + y + "-" + x).html(token);
}

function onBoard(y,x) {
    return (y >= 0 && y < cols && x >= 0 && x < rows);
}

function newWall(y,x,token) {
    placeToken({y:y,x:x,token:token})
}