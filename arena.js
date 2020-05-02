let rows = 7;
let cols = 7;
let creatures = [];
let blankToken = ".";
function start() {
    for (let i = 0; i < cols; i++) {
        $("#arena-board").append("<tr></tr>")
        for (let j = 0; j < cols; j++) {
            $("#arena-board tr:last").append('<td id="cell-' + i + '-' + j + '">' + blankToken + '</td>')
        }
    }

    let newBandit = new Bandit();
    newBandit.x = 2;
    newBandit.y = 2;
    newBandit.token = "#";
    newBandit.direction = [0,1]
    newBandit.move = function() {
        if (onBoard(this.x + newBandit.direction[1], this.y + newBandit.direction[0])) {
            placeToken(this.x,this.y,blankToken)
            this.y += newBandit.direction[0];
            this.x += newBandit.direction[1];
            placeToken(this.x,this.y,this.token)
        }
        else {
            this.direction[1] = this.direction[1] * -1;
        }
    }


    gameTick = setInterval(() => {
        newBandit.move();
    },100)
}

function placeToken(x,y,token) {
    $("#cell-" + x + "-" + y).html(token);
}

function onBoard(x,y) {
    return (x >= 0 && x < rows && y >= 0 && y < rows);
}
