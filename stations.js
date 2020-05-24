class Home extends Entity{
    constructor(y,x) {
        super({
            name:'home',
            y:y,
            x:x,
            token:"H",
        })
    }
}

class Forge extends Entity{
    constructor(y,x) {
        super({
            name:'forge',
            y:y,
            x:x,
            token:"F",
        })
    }
}