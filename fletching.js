// --- Bow Strings ---
class BowString extends Item {
    constructor(attributes) {
        super(attributes)
        this.recipe = attributes.recipe;
        this.skill = 'fletching'
    }
}

class FlaxBowString extends BowString {
    constructor() {
        super({name:'Flax Bowstring',value:20,recipe:[{item: new Flax,amount:6}],xp:20});
    }
}

// --- Bow Staves ----
class BowStave extends Item {
    constructor(attributes) {
        super(attributes)
        this.recipe = attributes.recipe;
        this.skill = 'fletching'
    }
}

class OakBowStave extends BowStave {
    constructor(attributes) {
        super({name:'Oak Bow Stave',value:20,recipe:[{item: new OakLog,amount:6}],xp:30});
    }
}