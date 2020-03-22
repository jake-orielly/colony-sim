let colonists = [];
function start() {
    let knight = new Knight();
    let bandit = new Bandit();
    console.log(bandit.hp)
    knight.attack(bandit);
    console.log(bandit.hp)
}