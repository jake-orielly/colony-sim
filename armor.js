class Armor extends Item {
    constructor(attributes) {
        super(attributes);
        this.armorBonus = attributes.armorBonus;
    }
}

class LeatherJerkin extends Armor {
    constructor() {
        super({name:'Leather Jerkin',armorBonus:5,value:10})
    }
}

class Breastplate extends Armor {
    constructor() {
        super({name:'Breastplate',armorBonus:7,value:10})
    }
}

class Platelegs extends Armor {
    constructor() {
        super({name:'Platelegs',armorBonus:5,value:10})
    }
}

class Greathelm extends Armor {
    constructor() {
        super({name:'Greathelm',armorBonus:3,value:10})
    }
}

class Gauntlets extends Armor {
    constructor() {
        super({name:'Gauntlets',armorBonus:1,value:10})
    }
}

class Boots extends Armor {
    constructor() {
        super({name:'Boots',armorBonus:2,value:10})
    }
}