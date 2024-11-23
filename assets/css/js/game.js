let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

alert("Simple Game just store the pattern in your 🧠 and follow");

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(color) {
    let audio0 = new Audio('assets/css/sounds/' + color + ".mp3");
    audio0.play();
}

function animatePress(currentColor) {

    $("div#" + currentColor).addClass("pressed");
    setTimeout(function() { $("div#" + currentColor).removeClass("pressed") }, 100);
}




function nextSequence() {
    userClickedPattern = [];
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("div#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    $("#level-title").text("Level " + level);
    level = level + 1;

}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel])
        console.log("success");
    else {
        let audio1 = new Audio("assets/css/sounds/wrong.mp3");
        audio1.play()
        $("body").addClass("game-over");
        setTimeout(function() { $("body").removeClass("game-over") }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function() {
            nextSequence();
        }, 1000);

    }


}

$(".btn").on("click", function handler() {

    let userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer((userClickedPattern.length) - 1);
});


$(document).keypress(function() {
    if (!started) {
        nextSequence();
        started = true;
    }

});