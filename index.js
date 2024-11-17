import Player from "./player.js";
import Dice from "./dice.js";

const playerF = new Player(0, true, "F");
const playerN = new Player(0, false, "N");

var player = playerF;

var diceImg_list = document.querySelectorAll(".dice img");

var buttonsOfPlayer = document.querySelectorAll(".result-board button");
var buttonsOfF = document.querySelectorAll(".player-F button");
var buttonsOfN = document.querySelectorAll(".player-N button");

var diceButtonList = document.querySelectorAll(".dice button");

var gameOverF = 11;
var gameOverN = 11;

buttonsNDisabled();
buttonsFDisabled();

buttonsOfPlayer.forEach( (button) => {
    button.addEventListener("click", () => {
        if (button.parentElement.classList[0].charAt(7) === player.getName()) {
            var score = button.textContent;
            player.increaseScore(parseInt(score));
            player.setIsTurn(false);
            player.resetScoreAndEarning();
            button.classList.add("used-button");
            diceButtonList.forEach(button => {
                button.classList.remove("selected");
            });
            diceImg_list.forEach(img => {
                img.style.opacity = 0;
            });

            var buttonsList = document.querySelectorAll(".player-" + player._name + " button:not(.used-button)");
            console.log(buttonsList);
            for (let i = 0; i < buttonsList.length; i++) {
                buttonsList[i].textContent = 0;
            }



            if (player.getName() === "F"){
                if(--gameOverF === 0 && gameOverN === 0)  
                    alert(winnerFinder());
                document.querySelector("#scoreF").textContent= "F: " + player.getScore();
                buttonsFDisabled();
                player = playerN;
            }
            else{
                if(--gameOverN === 0 && gameOverF === 0)  
                    alert(winnerFinder());
                document.querySelector("#scoreN").textContent= "N: " + player.getScore();
                buttonsNDisabled();
                player = playerF;

            }
            player.setIsTurn(true);  

            document.querySelector(".roll-button").classList.toggle("N");

            


        }
    }, {once: true});
});

var j=0;
document.querySelector(".roll-button").addEventListener('click', () => {
    setTimeout(roll(player), 1500);
});











for (let f = 0; f < 5; f++) {
    let button = diceButtonList[f];
    console.log(button);
    diceButtonList[f].addEventListener("click", () => {
        button.classList.toggle("selected");
        let dice = player.getDice(f);
        dice.setIsSelected(!(dice.getIsSelected()));

    });
    
}


function roll(player){
    if (player instanceof Player) {
        

        var allSelected = true;
        diceButtonList.forEach((button) => {
            allSelected *= button.classList.contains("selected");
        })
        if (allSelected == 1) {
            return;
        }

        if(player.getMaxRoll() == 0)
            return;
    
        if (player instanceof Player) {
            for (let i = 0; i < 5; i++){
                let dice = player.getDice(i);
                dice.roll();
                
                if(!dice.getIsSelected()){
                    console.log(dice.getNumber());
                    diceImg_list[i].setAttribute("src", "./images/dice-" + dice.getNumber() + ".svg");
                    diceImg_list[i].style.opacity = 1;

                }
                else{
                    diceImg_list[i].style.opacity = 1;
                }
            }

            
            console.log("Max roll is now " + player.getMaxRoll());
            if(j++ != 4){
                setTimeout(() => roll(player), "300");
            }
            else{
                j = 0;
                console.log(player.getDiceListNumber());
                var scoresList = player.getAllScores();

                buttonEnabler(player);
                

                var buttonsList = document.querySelectorAll(".player-" + player._name + " button");
                for (let i = 0; i < buttonsList.length; i++) {
                    if (!buttonsList[i].classList.contains("used-button")) {
                        buttonsList[i].textContent = scoresList[i];
                        if (i == 10 && scoresList[i]>0) { //elave et: eger bir defe basilibsa day gelse de yehu olmasin
                            alert("yehu");
                        }
                    }
                    
                }
                console.log(scoresList);

                
                return;
            }
        } 
    }

    return

    
}

function buttonsFDisabled() {
    buttonsOfF.forEach((button) => {
        button.disabled = true;
        button.classList.add("off-button");
    });

    
}
function buttonsNEnabled() {
    buttonsOfN.forEach((button) => {
        button.disabled = false;
        button.classList.remove("off-button");
    });
}

function buttonsNDisabled() {
    buttonsOfN.forEach((button) => {
        button.disabled = true;
        button.classList.add("off-button");
    });
}
function buttonsFEnabled() {
    buttonsOfF.forEach((button) => {
        button.disabled = false;
        button.classList.remove("off-button");
    });
}

function buttonEnabler(player){
    if (player instanceof Player && player.getMaxRoll() != 2) {
        return;
    }
    if (player.getName() === "F") {
        buttonsFEnabled();
    }
    else    
        buttonsNEnabled();
}


function winnerFinder() {
    let playerName = "Player";
    if (playerF.getScore() > playerN.getScore())
        playerName += "F";
    else if (playerF.getScore() < playerN.getScore())
        playerName += "N";
    else    
        return "Draw!"

    return playerName + "Wins!"
}

