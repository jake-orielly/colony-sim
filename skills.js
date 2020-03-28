class Skill {
    constructor(attributes) {
        this.name = attributes.name;
        this.xp = 0;
        this.level = 1;
    }

    gainXP(amount) {
        this.xp += amount;
        console.log(this.xp,this.xpToLevel(this.level),this.xp >= this.xpToLevel(this.level))
        if (this.xp >= this.xpToLevel(this.level))
            this.levelUp();
        this.renderSkill();
    }

    renderSkill() {
        $('#' + this.name + '-skill .skill-inner').width(this.xp / this.xpToLevel(this.level) * 100 + '%');
        $('#' + this.name + '-skill .level-text').html(this.level);
    }

    xpToLevel(level) {
        let xp = level + 300 * Math.pow(2,level/7)
        xp /= 4;
        if (level > 1)
            xp += this.xpToLevel(level - 1);
        return parseInt(xp);
    }

    levelUp() {
        this.xp -= this.xpToLevel(this.level);
        this.level++;
    }
}