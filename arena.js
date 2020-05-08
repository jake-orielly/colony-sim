let rows = 11;
let cols = 11;
let entities = [];
let arenaBoard = [];
let blankToken = ".";
let home = new Home(2,2);

function start() {
    for (let y = 0; y < cols; y++) {
        arenaBoard[y] = [];
        $("#arena-board").append("<tr></tr>")
        for (let x = 0; x < cols; x++) {
            $("#arena-board tr:last").append('<td id="cell-' + y + '-' + x + '"></td>')
            placeToken(new BlankSpace(y,x));
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

    for (let i = 2; i < 6; i++)
        newWall(1,i,'#')

    for (let i = 2; i < 11; i++)
        newWall(4,i,'#')

    for (let i = 6; i < 11; i++)
        newWall(i,4,'#')

    for (let i = 1; i < 5; i++)
        newWall(i,1,'#')

    entities.push(new Bandit(3,2,'@'));
    entities.push(new Bandit(2,3,'&'));
    entities.push(new Bandit(3,3,'%'));
    entities.push(home);
    entities.push(new BerryBush(0,10));
    entities.push(new BerryBush(3,9));
    entities.push(new BerryBush(9,10));
    entities.push(new BerryBush(10,5));
    entities.push(new PineTree(2,6));
    entities.push(new PineTree(2,10));
    entities.push(new PineTree(7,3));
    gameTickInterval = setInterval(() => {
        gameTick();
    },100)
}

function gameTick() {
    for (let i of entities) {
        if (i instanceof Creature)
            i.move();
        else
            i.render();
    }
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