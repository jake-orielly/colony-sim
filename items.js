class Item {
    constructor(attributes) {
        this.name = attributes.name;
        this.value = attributes.value;
        this.skill = attributes.skill;
        this.xp = attributes.xp;
        this.craft = craft;
    }

    create() {
        this.addToInventory(1);
        skills[this.skill].gainXP(this.xp);
    }

    addToInventory(amount = 1) {
        if (home.inventory[this.name])
            home.inventory[this.name].amount += amount;
        else
            home.inventory[this.name] = {item:this,amount:amount};

        renderInventory();
    }

    removeFromInventory(amount = 1) {
        home.inventory[this.name].amount -= amount
        if (home.inventory[this.name].amount == 0)
                delete home.inventory[this.name];
        renderInventory();
    }

    haveAmount(amount = 1) {
        if (home.inventory[this.name])
            return home.inventory[this.name].amount >= amount;
        return false;
    }
}

function craftItem(Item) {
    new Item().craft();
}

// --- Produce ---
class Produce extends Item {
    constructor(attributes) {
        super(attributes)
    }
}

class Berry extends Produce {
    constructor() {
        super({name:'berry',value:3,skill:'foraging',xp:6})
    }
}

class Mushroom extends Produce {
    constructor() {
        super({name:'mushroom',value:6,skill:'foraging',xp:15})
    }
}

class Flax extends Produce {
    constructor() {
        super({name:'flax',value:8,skill:'foraging',xp:20})
    }
}

// --- Ore ---

class Ore extends Item {
    constructor(attributes) {
        super(attributes)
    }
}

class IronOre extends Ore {
    constructor() {
        super({name:'iron_ore', value:5,skill:'mining',xp:16})
    }
}

class Coal extends Ore {
    constructor() {
        super({name:'coal', value:7,skill:'mining',xp:25})
    }
}

// --- Ingots ---

class Ingot extends Item {
    constructor(attributes) {
        super(attributes)
        this.recipe = attributes.recipe;
    }
}

class IronIngot extends Ingot {
    constructor() {
        super({name:'iron_ingot', value:15, recipe:[{item: new IronOre,amount:2}],skill:'smithing',xp:35})
    }
}

class SteelIngot extends Ingot {
    constructor() {
        super({name:'steel_ingot', value:15, recipe:[{item: new IronOre,amount:2,item: new Coal,amount:2}],skill:'smithing',xp:70})
    }
}

function craft() {
    if (canAfford(this.recipe)) {
        for (let i of this.recipe)
                i.item.removeFromInventory(i.amount);
                this.create();
        return true;
    }
    else
        return false;
}

function canAfford(recipe) {
    for (let i of recipe)
        if (!i.item.haveAmount(i.amount))
            return false;
    return true;
}