
class ResourceNode extends Entity {
    constructor(attributes) {
        super({
            name:attributes.name,
            y:attributes.y,
            x:attributes.x,
            token:attributes.token,
        })
        this.inventory = attributes.inventory;
    }

    removeItem(item,amount = 1) {
        let removed = super.removeItem(item,amount);
        if (this.inventoryTotal() == 0) {
            entities.splice(entities.indexOf(this), 1);
            placeToken(new BlankSpace(this.y,this.x))
        }
        return removed;
    }
}

class BerryBush extends ResourceNode {
    constructor(y,x) {
        super({
            name:'berry_bush',
            y:y,
            x:x,
            token:"B",
            inventory:{berry:{item:Berry,amount:10}}
        })
    }
}

class PineTree extends ResourceNode {
    constructor(y,x) {
        super({
            name:'pine_tree',
            y:y,
            x:x,
            token:"T",
            inventory:{pine_log:{item:PineLog,amount:10}}
        })
    }
}

class OakTree extends ResourceNode {
    constructor(y,x) {
        super({
            name:'oak_tree',
            y:y,
            x:x,
            token:"O",
            inventory:{oak_log:{item:OakLog,amount:15}}
        })
    }
}


class IronVein extends ResourceNode {
    constructor(y,x) {
        super({
            name:'iron_vein',
            y:y,
            x:x,
            token:"I",
            inventory:{iron_ore:{item:IronOre,amount:10}}
        })
    }
}

class CoalVein extends ResourceNode {
    constructor(y,x) {
        super({
            name:'coal_vein',
            y:y,
            x:x,
            token:"C",
            inventory:{coal_vein:{item:Coal,amount:10}}
        })
    }
}

class FlaxPlant extends ResourceNode {
    constructor(y,x) {
        super({
            name:'flax_plant',
            y:y,
            x:x,
            token:"F",
            inventory:{flax:{item:Flax,amount:5}}
        })
    }
}