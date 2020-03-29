class Bow extends Weapon {
    constructor(attributes) {
        super(attributes);
        this.skill = "fletching";
        this.recipe = attributes.recipe;
    }
}

class Shortbow extends Bow {
    constructor() {
        super({name:'shortbow',damage:[1,6],damageType:'piercing',range:15,value:10,recipe:[{item:new FlaxBowString,amount:1},{item:new OakBowStave, amount:1}]});
    }
}

class HeavyCrossbow extends Bow {
    constructor() {
        super({name:'heavy_crossbow',damage:[1,10],damageType:'piercing',range:20,value:10})
    }
}