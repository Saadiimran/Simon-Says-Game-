let userClickedPattern = [];
let gamePattern = [];

let buttonColours = ["red","blue","green","yellow"];


var started = false;

var level = 0;

$(document).keypress(function () { 
    if(!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    
});

$(".btn").on("click", function(e){
    

    var userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);

})


function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length)
            {
                setTimeout(function () {
                    nextSequence();
                },1000);
            }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
        
            $("body").removeClass("game-over");
        },200)
        startover();
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}




function animatePress(currentColor) 
{ 
    $("#" + currentColor).addClass("pressed");
    setTimeout(function()
    {
        $("#" + currentColor).removeClass("pressed");
    },100)
            
}

function playSound(name)
{    
    var moosic = new Audio("sounds/" + name + ".mp3");
    moosic.play();
}
function startover()
{
    level = 0;
    gamePattern = [];
    started = false;
}


