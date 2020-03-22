class Item {
    constructor(attributes) {
        this.name = attributes.name;
        this.value = attributes.value;
    }

    addToInventory(amount = 1) {
        for (let i of inventory)
            if (i.item.name == this.name) {
                i.amount += amount
                return
            }
        inventory.push({item:this,amount:amount})
    }
}

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