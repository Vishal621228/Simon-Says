let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let btns = document.querySelectorAll(".box");

const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
let resp;
if(true) {
    h2.innerText = "Click start button to start the game!";
    resp = "touchstart";
    let startBtn = document.createElement("button");
    startBtn.innerText = "Start";
    startBtn.classList.add("startBtn");
    let container  = document.querySelector(".container");
    container.insertAdjacentElement("afterend", startBtn);
    startBtn.addEventListener(resp, function() {
        if(started == false) {
            started = true;
            levelUp();
            startBtn.style.display = "none";
        }
    });
} else {
    resp = "click";
    document.addEventListener("keypress", function() {
        if(started == false) {
            started = true;
            levelUp();
        }
    });
}


function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}
function randomBtn(btns) {
    let num = Math.floor(Math.random()*4);
    return btns[num];
}
function levelUp() {
    level++;
    h2.innerText = `Level ${level}`;
    let randBtn = randomBtn(btns);
    gameSeq.push(randBtn.classList[1]);
    
    for(let i=0; i<gameSeq.length; i++) {
        setTimeout(function() {
            btnFlash(document.querySelector(`.${gameSeq[i]}`));
        }, 500*(i+1))
    }
    userSeq = [];
}

for(let btn of btns) {
    btn.addEventListener(resp, function(event) {
        btnFlash(btn);
        event.stopPropagation();
        if(started == true) {
            userSeq.push(btn.classList[1]);
            let idx = userSeq.length - 1;
            if(userSeq[idx] != gameSeq[idx]) {
                h2.innerText = `Game Over! You reached Level ${level}! Press any key to start again`;
                started = false;
                level = 0;
                gameSeq = [];
                userSeq = [];
                if(isMobile) {
                    startBtn.style.removeProperty("display");
                }
                return;
            }
            if(userSeq.length === gameSeq.length) {
                setTimeout(levelUp, 250);
            }
        }
    });
}
