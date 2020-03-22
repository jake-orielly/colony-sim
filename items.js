class Item {
    constructor(attributes) {
        this.name = attributes.name;
        this.value = attributes.value;
    }
}

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
        super({name:'Shortsword',damage:[1,6],damageType:'slashing',range:1,value:10})
    }
}

class Greatsword extends Weapon {
    constructor() {
        super({name:'Greatsword',damage:[2,12],damageType:'slashing',range:1,value:10})
    }
}

class HeavyCrossbow extends Weapon {
    constructor() {
        super({name:'Heavy Crossbow',damage:[1,10],damageType:'piercing',range:20,value:10})
    }
}