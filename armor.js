class Armor extends Item {
    constructor(attributes) {
        super(attributes);
        this.armorBonus = attributes.armorBonus;
    }
}

class LeatherJerkin extends Armor {
    constructor() {
        super({name:'leather_jerkin',armorBonus:5,value:10})
    }
}

class Breastplate extends Armor {
    constructor() {
        super({name:'breastplate',armorBonus:7,value:10})
    }
}

class Platelegs extends Armor {
    constructor() {
        super({name:'platelegs',armorBonus:5,value:10})
    }
}

class Greathelm extends Armor {
    constructor() {
        super({name:'greathelm',armorBonus:3,value:10})
    }
}

class Gauntlets extends Armor {
    constructor() {
        super({name:'gauntlets',armorBonus:1,value:10})
    }
}

class Boots extends Armor {
    constructor() {
        super({name:'boots',armorBonus:2,value:10})
    }
}