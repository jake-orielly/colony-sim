// --- Wood ---
class Log extends Item {
    constructor(attributes) {
        super(attributes);
        this.skill = 'woodcutting'
    }
}

class PineLog extends Log {
    constructor(attributes) {
        super({name:'pine_log', value:3,xp:10})
    }
}

class OakLog extends Log {
    constructor(attributes) {
        super({name:'oak_log', value:5,xp:15})
    }
}