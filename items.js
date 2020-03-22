class Item {
    constructor(attributes) {
        this.name = attributes.name;
        this.value = attributes.value;
    }

    addToInventory(amount = 1) {
        console.log(inventory)
        for (let i of inventory)
            if (i.item.name == this.name) {
                i.amount += amount
                renderInventory();
                return
            }
        inventory.push({item:this,amount:amount})
        renderInventory();
    }

    removeFromInventory(amount = 1) {
        for (let i in inventory)
            if (inventory[i].item.name == this.name) {
                inventory[i].amount -= amount
                if (inventory[i].amount == 0)
                    delete inventory[i];
            }
        renderInventory();
    }

    haveAmount(amount = 1) {
        for (let i of inventory)
            if (i.item.name == this.name) {
                return i.amount >= amount
            }
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
        super({name:'Berry',value:3})
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
        super({name:'Iron Ore', value:5})
    }
}

// --- Ingots ---

class Ingot extends Item {
    constructor(attributes) {
        super(attributes)
        this.recipe = attributes.recipe;
    }

    smelt() {
        for (let i of this.recipe) {
            console.log(i.item.haveAmount(i.amount),i.item,i.amount)
            if (i.item.haveAmount(i.amount)) {
                i.item.removeFromInventory(i.amount);
                this.addToInventory(1);
            }
            else 
                return false;
        }
        return true;
    }
}

class IronIngot extends Ingot {
    constructor() {
        super({name:'Iron Ingot', value:15, recipe:[{item: new IronOre,amount:2}]})
    }
}