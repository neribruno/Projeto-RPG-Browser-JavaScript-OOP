class Character {
    _life = 0;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name) {
        this.name = name
    }


    get life() {
        return this._life;
    }

    set life(newLife) {
        this._life = newLife < 0 ? 0 : newLife;
    }

}

//classes do jogo

class Knight extends Character {

    constructor(name) {
        super(name);
        this.life = 60;
        this.maxLife = this.life;
        this.attack = 15;
        this.defense = 12;
    }
}

class Rogue extends Character {

    constructor(name) {
        super(name);
        this.life = 38;
        this.maxLife = this.life;
        this.attack = 20;
        this.defense = 4;
    }
}

// monstros

class Goblin extends Character {

    constructor(name) {
        super(name);
        this.life = 60;
        this.maxLife = this.life;
        this.attack = 8;
        this.defense = 2;
    }
}

class Gnoll extends Character {

    constructor(name) {
        super('Gnoll');
        this.life = 100;
        this.maxLife = this.life;
        this.attack = 8;
        this.defense = 4;
    }
}


class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1; // barra de vida
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El; //botão de ação
        this.fighter2El = fighter2El;
        this.log = logObject;
    }

    start() {
        this.update();
        this.fighter1El.querySelector('.attack-button').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attack-button').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }


    update() { // vai atualizar a barra de vida
        //player
        this.fighter1El.querySelector('.char-name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(2)} HP`
        let f1Percent = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Percent}%`;
        //monstro
        this.fighter2El.querySelector('.monster-name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(2)} HP`;
        let f2Percent = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Percent}%`;
    }

    doAttack(attacking, attacked) {
        if (attacking.life <= 0 || attacked.life <= 0) {
            this.log.addMessage(`Jogo encerrado!`); 
            return;
        } 
        
        let attackFactor = (Math.random() * 2).toFixed(2);
        let defenseFactor = (Math.random() * 2).toFixed(2);

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defense * defenseFactor;

        if(actualAttack > actualDefense)  {
            attacked.life -= actualAttack;
            this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}.`);
        } else {
            this.log.addMessage(`${attacked.name} se defendeu de ${actualAttack.toFixed(2)} dano.`);
        }

        this.update();
    }



}

class Log {
    list = [];
    

    constructor(listEl) {
        this.listEl = listEl;
    }

    addMessage(msg) {
        this.list.push(msg);
        this.render();
    }

    render() {
        this.listEl.innerHTML = '';

        for (let i in this.list) {
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}