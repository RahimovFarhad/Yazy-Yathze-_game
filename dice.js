class Dice{
    constructor(){
        this._number = 0;
        this._isSelected = false;
    } 
    
    setNumber(number){
        this._number = number;
    }
    getIsSelected(){
        return this._isSelected;
    }
    setIsSelected(isSelected){
        this._isSelected = isSelected;
    }
    roll(){
        if (!this._isSelected){
            this._number = Math.floor(Math.random() * 6) + 1;
        }
        else
            return this._number;
    }
    getNumber(){
        return this._number;
    }
}

export default Dice;