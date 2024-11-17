import Player from "./player.js";

class Earning{
    constructor(criteria, player){
        this._criteria = criteria;
        this._score = 0;
        if (player instanceof Player){
            this._player = player;
            this._isAvailable = true;
        }
            
    }

    getIsAvailable(){
        return this._isAvailable;
    }
    getScore(){
        if (!this._isAvailable) {
            return this._score;
        }
        else{
            this._score = 0;
            if (Number.isInteger(this._criteria)){
                this._player.getDiceListNumber().forEach(element => {
                    if (element === this._criteria)
                        this._score += this._criteria;
                });
            }
            else{
                var hm = [0, 0, 0, 0, 0, 0];
                var fullSum = 0;
                this._player.getDiceListNumber().forEach(element => {
                    hm[element-1]++;
                    fullSum += element;
                });

                switch (this._criteria) {
                    case "triple":
                        hm.forEach(element => {
                            if (element >= 3)
                                this._score = fullSum;
                        });
                        break;

                    case "quadruple": 
                        hm.forEach(element => {
                            if (element >= 4)
                                this._score = fullSum;
                        });
                        break;

                    case "3to2":
                        var trip, square;

                        hm.forEach(element => {
                            if (element === 2)
                                square = true;
                            else if (element === 3)
                                trip = true;
                        });
                        if (trip === true && square === true)
                            this._score = 25;
                        break;

                    case "subsequent":
                        hm.forEach(element => {
                            if (element > 1){
                                this._score = -1;
                            }
                        });
                        if (this._score !== -1 && (fullSum === 15 || fullSum === 20))
                            this._score = 40;
                        else
                            this._score = 0;
                        break;

                    case "allInOne":
                        hm.forEach(element => {
                            if (element === 5){
                                this._score = 50;
                            }
                        });
                        break;

                
                    default:
                        break;
                }
            }
        
            return this._score;
        }
    }

    setScore(){
        this._score = 0;
    }


}

export default Earning;
