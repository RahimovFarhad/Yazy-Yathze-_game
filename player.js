import Dice from "./dice.js";
import Earning from "./earning.js";


class Player{
    constructor(score, isTurn, name){
        this._score = score;
        this._isTurn = isTurn;
        this._diceList = [new Dice(), new Dice(), new Dice(), new Dice(), new Dice()];
        this._name = name;
        this._maxRoll = 3;

        this._one = new Earning(1, this);
        this._two = new Earning(2, this);
        this._three = new Earning(3, this);
        this._four = new Earning(4, this);
        this._five = new Earning(5, this);
        this._six = new Earning(6, this);
        this._triple = new Earning("triple", this);
        this._quadruple = new Earning("quadruple", this);
        this._3to2 = new Earning("3to2", this);
        this._subsequent = new Earning("subsequent", this);
        this._allInOne = new Earning("allInOne", this);
    } 
    getMaxRoll(){
        return this._maxRoll;
    }
    getName(){
        return this._name;
    }

    getScore(){
        return this._score;
    }
    setScore(score){
        this._score = score;
    }
    increaseScore(increment){
        this._score += increment;
        this._maxRoll = 3;
    }
    getIsTurn(){
        return this._isTurn;
    }
    setIsTurn(isTurn){
        this._isTurn = isTurn;
    }
    getDice(index){
        return this._diceList[index];
    }
    setDice(index, number){
        this._diceList[index] = number;
    }
    getDiceList(){
        return this._diceList;
    }
    getDiceListNumber(){
        var list = [];
        this.getDiceList().forEach(dice => {
            list.push(dice.getNumber());
        });
        return list;
    }
    resetScoreAndEarning(){
        this._diceList.forEach((dice) => dice.setIsSelected(false));
        
        // this._one.setScore(0);
        // this._two.setScore(0);
        // this._three.setScore(0);
        // this._four.setScore(0);
        // this._five.setScore(0);
        // this._six.setScore(0);
        // this._triple.setScore(0);
        // this._quadruple.setScore(0);
        // this._3to2.setScore(0);
        // this._subsequent.setScore(0);
        // this._allInOne.setScore(0);
    }
    getAllScores(){
        var scoreList = [];

        scoreList.push(this._one.getScore());
        scoreList.push(this._two.getScore());
        scoreList.push(this._three.getScore());
        scoreList.push(this._four.getScore());
        scoreList.push(this._five.getScore());
        scoreList.push(this._six.getScore());
        scoreList.push(this._triple.getScore());
        scoreList.push(this._quadruple.getScore());
        scoreList.push(this._3to2.getScore());
        scoreList.push(this._subsequent.getScore());
        scoreList.push(this._allInOne.getScore());

        this._maxRoll--;

        return scoreList;
    }
    
}

export default Player;