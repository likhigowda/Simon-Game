function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    level = level + 1;
    $("#level-title").text("Level " + level);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); 
    playSound(randomChosenColor);

}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play(); 
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");

    setTimeout(function() {
        $("." + currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                userClickedPattern = [];
                nextSequence();
            },1000);
        }

    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");


        startOver();
        started = false;

    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}

var level = 0;

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var started = false;

$(document).on("keydown",function() {
    if(started === false) {
        nextSequence();
        started = true;
    }
 
})

var userClickedPattern = [];

$(".btn").on("click",function() {

    if(started === true) {
        var userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        animatePress(userChosenColor);
        playSound(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);

    }
    
   
})



