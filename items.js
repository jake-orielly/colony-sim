class Item {
    constructor(attributes) {
        this.name = attributes.name;
        this.value = attributes.value;
    }

    addToInventory(amount = 1) {
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
                return item.amount >= amount
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