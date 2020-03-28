class Item {
    constructor(attributes) {
        this.name = attributes.name;
        this.value = attributes.value;
        this.skill = attributes.skill;
        this.xp = attributes.xp;
    }

    create() {
        this.addToInventory(1);
        skills[this.skill].gainXP(this.xp);
    }

    addToInventory(amount = 1) {
        if (inventory[this.name])
            inventory[this.name].amount += amount;
        else
            inventory[this.name] = {item:this,amount:amount};

        renderInventory();
    }

    removeFromInventory(amount = 1) {
        inventory[this.name].amount -= amount
        if (inventory[this.name].amount == 0)
                delete inventory[this.name];
        renderInventory();
    }

    haveAmount(amount = 1) {
        if (inventory[this.name])
            return inventory[this.name].amount > amount;
        return false;
    }
}

// --- Produce ---
class Produce extends Item {
    constructor(attributes) {
        super(attributes)
    }
}

class Berry extends Produce {
    constructor() {
        super({name:'berry',value:3})
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

    craft() {
        genericCraft(this);
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

function genericCraft(item) {
    for (let i of item.recipe) {
        if (i.item.haveAmount(i.amount)) {
            i.item.removeFromInventory(i.amount);
            item.create();
        }
        else 
            return false;
    }
    return true;
}