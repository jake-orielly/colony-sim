class Weapon extends Item {
    constructor(attributes) {
        super(attributes);
        this.damage = attributes.damage;
        this.damageType = attributes.damageType;
        this.range = attributes.range;
    }
}

class Shortsword extends Weapon {
    constructor() {
        super({name:'shortsword',damage:[1,6],damageType:'slashing',range:1,value:10})
    }
}

class Greatsword extends Weapon {
    constructor() {
        super({name:'greatsword',damage:[2,12],damageType:'slashing',range:1,value:10})
    }
}

class Shortbow extends Weapon {
    constructor() {
        super({name:'shortbow',damage:[1,6],damageType:'piercing',range:15,value:10})
    }
}

class HeavyCrossbow extends Weapon {
    constructor() {
        super({name:'heavy_crossbow',damage:[1,10],damageType:'piercing',range:20,value:10})
    }
}