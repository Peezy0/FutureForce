//Add your global variables here
let play = false;
let pattern = [];
let level = 7;
let gameStarted = false
let highlightProgress = 0;


// Add your functions here
//Random integer function
const randomNums = (pMin, pMax) => {
    let min = Math.ceil(pMin);
    let max = Math.floor(pMax);
    return Math.floor(Math.random() * (max - min) + min);
}

// Function to add 8 random numbers to the pattern array to get a random pattern for the sound hint
const randomPattern = () => {
    for (let i = 0; i < 7; i++) {
        pattern.push(randomNums(0, 3));
    }
}
//Function to start the game and begin usability of the start and stop button
const startGame = () => {
    gameStarted = !gameStarted;
    if (gameStarted == true) {
        document.getElementById("start").innerHTML = "Stop";
        pattern = [];
        randomPattern();
        playHint();
    }
    else {
        document.getElementById("start").innerHTML = "Start";
    }
}
// Function to toggle the play and pause button when the game has started
const toggleGame = () => {
    play = !play;
    if (play == true) {
        document.getElementById("pause").innerHTML = "Pause";
    }
    else {
        document.getElementById("pause").innerHTML = "Play";
    }
}
//Function to show highlights to the buttons, that follows the pattern array nums (0,1,2,3), also added a pause function
const playHint = async () => {

    for (let i = highlightProgress; i < level; i++) {
        if (play == true) {
            if (i >= level) {
                highlightProgress = 0;
            }
            else {
                highlightProgress = i;
            }
            await highlightButton(pattern[i]);
        }
        else {
            return;
        }


    }

}
// Function that adds active to the classlist and so if it has GreenS it adds active to it and highlights the button sets to whatever class
const highlightButton = async (button) => {
    const docButton = document.getElementById('button-' + button);
    docButton.classList.add('active');
    await new Promise((resolve) => {
        setTimeout(() => {
            docButton.classList.remove('active');
            resolve();
        }, 1000)
    })
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 500)
    })
}

// Sound Synthesis Functions for Steps 6-8
// You do not need to edit the below code
const freqMap = {
    1: 261.6,
    2: 329.6,
    3: 392,
    4: 466.2
}
function playTone(btn, len) {
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025)
    context.resume()
    tonePlaying = true
    setTimeout(function () {
        stopTone()
    }, len)
}
function startTone(btn) {
    if (!tonePlaying) {
        context.resume()
        o.frequency.value = freqMap[btn]
        g.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025)
        context.resume()
        tonePlaying = true
    }
}
function stopTone() {
    g.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025)
    tonePlaying = false
}

// Page Initialization
// Init Sound Synthesizer
let AudioContext = window.AudioContext || window.webkitAudioContext
let context = new AudioContext()
let o = context.createOscillator()
let g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0, context.currentTime)
o.connect(g)
o.start(0)