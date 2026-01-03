// <=================================Functions ===========================================> 
function mode_change() {
    if (mode === "light") {
        document.querySelector("#body_light").setAttribute("id","body_dark");
        document.querySelector("#title_light").setAttribute("id","title_dark");
        document.querySelector("#mode_light").setAttribute("id","mode_dark");
        let boxes = document.querySelectorAll(".box");
        for (box of boxes) {
            box.classList.add("box_dark");
            box.classList.remove("box_light");
        }
        document.querySelector(".reset").classList.add("reset_dark");
        document.querySelector(".reset").classList.remove("reset_light");
        if (document.querySelector(".msg")){
            document.querySelector(".msg").classList.add("msg_dark");
            document.querySelector(".msg").classList.remove("msg_light");
        }
        //A NodeList does not have a classList property. Only individual elements do.
        mode = "dark";
    } else {
        document.querySelector("#body_dark").setAttribute("id","body_light");
        document.querySelector("#title_dark").setAttribute("id","title_light");
        document.querySelector("#mode_dark").setAttribute("id","mode_light");
        let boxes = document.querySelectorAll(".box");
        for (box of boxes) {
            box.classList.add("box_light");
            box.classList.remove("box_dark");
        }
        document.querySelector(".reset").classList.add("reset_light")
        document.querySelector(".reset").classList.remove("reset_dark");
        if (document.querySelector(".msg")){
            document.querySelector(".msg").classList.add("msg_light");
            document.querySelector(".msg").classList.remove("msg_dark");
        }
        mode = "light";
    }
    console.log(`Changing Mode To: ${mode}`);
}

function checkWinner() {
    let win = false;
    for (let pattern of WinPattern) {
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;
        if (val1 !== "" && val2 !== "" && val3 !== "") {
            if (val1 === val2 && val2 === val3){
                console.log(`${val1} is the Winner`);
                showWinner(val1);
                boxes.forEach((box) => {
                    box.disabled = true;
                    win = true;
                })
            }
        }
    }
    if (win === true) {
        return true;
    } else {
        return false;
    }
}

function showWinner(win) {
    msg.innerText = `Congratulations, The Winner Is ${win}`;
    msg.classList.remove("hide");
    msg.classList.add("msg");
    if (mode === "dark") {
        document.querySelector(".msg").classList.add("msg_dark");
        document.querySelector(".msg").classList.remove("msg_light");
    } else {
        document.querySelector(".msg").classList.add("msg_light");
        document.querySelector(".msg").classList.remove("msg_dark");
    }
}
function showDraw() {
    console.log("The match is Draw");
    msg.innerText = `The Match is A Draw`;
    msg.classList.remove("hide");
    msg.classList.add("msg");
    if (mode === "dark") {
        document.querySelector(".msg").classList.add("msg_dark");
        document.querySelector(".msg").classList.remove("msg_light");
    } else {
        document.querySelector(".msg").classList.add("msg_light");
        document.querySelector(".msg").classList.remove("msg_dark");
    }
}

function reset() {
    msg.classList.add("hide");
    msg.classList.remove("msg");
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    })
    turnX = true;
    count = 0;
    win = false;
}

// <============================================== Working ================================================>
//Background Change
let btn = document.querySelector(".mode_change");
let mode = "light";
btn.addEventListener("click",mode_change);

//Access All Boxes
let boxes = document.querySelectorAll(".box");
//Access Reset Button
let resetBtn = document.querySelector(".reset");
let msg = document.querySelector(".hide");

//Saving of Winning Pattern
let WinPattern = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]; 
let count = 0;
let turnX = true;  //To determine that when X turn comes
//Working Of Tic Tac Toe Game
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("Box is Clicked ...");
        count = count + 1
        if (turnX) {
            box.style.color = "red";
            box.innerText = "X";
            turnX = false;
        } else {
            box.style.color = "green";
            box.innerText = "O";
            turnX = true;
        };
        win = checkWinner();
        if (count === 9 && win === false) {
            showDraw();
        }
        box.disabled = true;
    });
});
//Reset Button
resetBtn.addEventListener("click",reset);