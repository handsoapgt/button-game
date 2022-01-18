var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;


$(document).ready(function() {

    $(document).on("keydown", function() {
        if (!gameStarted) {
            gameStarted = true;
            nextSequence();
        }
    }) 

    $(".btn").on("click", function(event) {
        // Get the id of the button
        var userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);
        console.log("User: " + userClickedPattern);

        // Flash the button
        $("#" + userChosenColor).addClass("pressed");
        setTimeout(function() {
            $("#" + userChosenColor).removeClass("pressed");
        }, 100);

        // Check if correct colour
        if (checkAnswer()) {
            playAudio(userChosenColor);
            if (userClickedPattern.length === gamePattern.length) {
                userClickedPattern = [];

                setTimeout(function() {
                    nextSequence();
                }, 800);
            }
        } else {
            playAudio("wrong");
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200)
            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
        }

    })
})

function checkAnswer() {
    var numClicked = userClickedPattern.length;
    for (var i = 0; i < numClicked; i++) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            return false;
        }
    }

    return true;
}

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);


    var randInt = Math.floor(4 * Math.random());
    gamePattern.push(buttonColours[randInt]);
    flashButton(buttonColours[randInt]);
    playAudio(buttonColours[randInt]);

    console.log("Game: " + gamePattern);
}

function flashButton(button) {
    $("#" + button).fadeOut(100).fadeIn(100);
}

function playAudio(button) {
    var audio = new Audio("sounds/" + button + ".mp3");
    if (button == "wrong") audio = new Audio("sounds/wrong.mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
}