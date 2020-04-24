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