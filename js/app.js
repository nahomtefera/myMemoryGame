let cards, cardID, firstCard, clickFlag, secondCard, _oldThis, clickDisabled, score, end_time, start_time, moves;

//Suffle Cards
cards = $(".deck").children();
shuffleCards(cards);

moves = 0;
timeFlag = 0;
score = 0;
clickFlag = 0;
_oldThis = null;
timer_min = 0;
timer_sec = 0;

// Click functionality
$(".card").click(function(){
    //Start time
    if(timeFlag === 0){
        start_time = Date.now();
        startTimer();

        timeFlag = 1; 
    }
    _this = $(this);    
    //flip card
    _this.addClass("flipped"); 
    _this.children(".fa").css("color", "#ff6464");
    
    // if the car already has a pair, clicking on it won't do anything
    if(_this.hasClass("paired")){
        return;
    }
    if(clickFlag === 0) {
        secondCard = "Click on another card";
        firstCard = $(this);
        clickFlag = 1;        
    } else {
        secondCard = _this;
        //check that we are not chosing the same card twice and compare
        if(firstCard.attr("id") === _this.attr("id")){            
            return;
        }else if(firstCard.children().attr("class") == secondCard.children().attr("class") && firstCard.attr("id")  !== secondCard.attr("id")){
            firstCard.addClass("paired");
            secondCard.addClass("paired");
            increaseMoves();
            score++;
        //Check if the game is done
            setTimeout(function(){
                winning();                
            }, 1000);
        }else if (firstCard.children().attr("class") !== secondCard.children().attr("class")) {
            
            increaseMoves();
            setTimeout(function(){
                firstCard.removeClass("flipped");
                firstCard.children(".fa").css("color", $(".card").css("background-color"));
                secondCard.removeClass("flipped");
                secondCard.children(".fa").css("color", $(".card").css("background-color"));
      
            }, 400);

        }
        clickFlag = 0;
    }
});

$("#restart-game").click(function(){
    playAgain();
});
$("#play-again").click(function(){
    playAgain();
});

// Suffle cards
function shuffleCards(arr){    
    cardID = ["fa fa-free-code-camp", "fa fa-bicycle", "fa fa-snowflake-o", "fa fa-anchor", "fa fa-bank", "fa fa-bed", "fa fa-binoculars", "fa fa-birthday-cake", "fa fa-free-code-camp", "fa fa-bicycle", "fa fa-snowflake-o", "fa fa-anchor", "fa fa-bank", "fa fa-bed", "fa fa-binoculars", "fa fa-birthday-cake"];
    
    for (let i = 0; i < arr.length; i++){
        randomIcon = Math.floor(Math.random() * cardID.length );
        document.getElementById("card-deck").children[i].children[0].className = cardID[randomIcon];
        cardID.splice(randomIcon, 1);//Remove ID that has been assigned
    }
    // Put back the cards in a deck
    cardID = ["fa fa-free-code-camp", "fa fa-bicycle", "fa fa-snowflake-o", "fa fa-anchor", "fa fa-bank", "fa fa-bed", "fa fa-binoculars", "fa fa-birthday-cake", "fa fa-free-code-camp", "fa fa-bicycle", "fa fa-snowflake-o", "fa fa-anchor", "fa fa-bank", "fa fa-bed", "fa fa-binoculars", "fa fa-birthday-cake"];
}

// Restart Game
function playAgain(){
    $(".card").removeClass("paired flipped")
    $(".card").children(".fa").removeClass();
    $(".card").children("i").addClass("fa");
    $(".card").children(".fa").css("color", $(".card").css("background-color"));  
    setTimeout(function(){
        shuffleCards(cards);        
    }, 1000);  
    moves = 0;    
    $(".moves-number").html(moves);    
    ratingStars();    
    firstCard = null;
    secondCard = null;
    timeFlag = 0;
    score = 0;
    clickFlag = 0;
}


//winning
function winning(){
    if (score === 8){
        end_time = Date.now();
        final_time = end_time - start_time;

        $("#myModal").modal();
        $(".finish-time").html(millisToMinutesAndSeconds(final_time));
    }
}
// Milliseconds to minutes and seconds.
function millisToMinutesAndSeconds(millis) {

    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    console.log(minutes + "min and " + (seconds < 10 ? '0' : '') + seconds + "s");
    return minutes + "min and " + (seconds < 10 ? '0' : '') + seconds + "s";
}

// Timer
function startTimer(){
        timer_min = 0;
        timer_sec = 0;
    setInterval(function(){
        console.log(timer_min);        
        timer_min++;
        $(".timer-min").html(timer_min);        
    }, 60000);

    setInterval(function(){
        timer_sec++;
        if(timer_sec === 60){
            timer_sec = 0;
        }
        console.log(timer_sec);
        $(".timer-sec").html(timer_sec);
    }, 1000);

};

// Stars
function ratingStars(){
    if(moves >= 0 && moves <= 11){
        $(".3-stars").removeClass("fa-star-half-o fa-star-o");
        $(".3-stars").addClass("fa-star");
        $(".2-stars").removeClass("fa-star-half-o fa-star-o");
        $(".2-stars").addClass("fa-star");
        $(".1-star").removeClass("fa-star-half-o fa-star-o");
        $(".1-star").addClass("fa-star");
    }else if( moves > 11 && moves <= 15){
        $(".3-stars").removeClass("fa-star");
        $(".3-stars").addClass("fa-star-half-o");
    }else if( moves > 15  && moves <= 17 ){
        $(".3-stars").removeClass("fa-star-half-o");
        $(".3-stars").addClass("fa-star-o");
    } else if (moves > 17  && moves <= 20 ) {
        $(".2-stars").removeClass("fa-star");
        $(".2-stars").addClass("fa-star-half-o");
    } else if (moves > 20  && moves <= 22){
        $(".2-stars").removeClass("fa-star-half-o");
        $(".2-stars").addClass("fa-star-o");
    } else if (moves > 22  && moves <= 24) {
        $(".1-star").removeClass("fa-star");
        $(".1-star").addClass("fa-star-half-o");
    } else if (25 < moves ){
        $(".1-star").removeClass("fa-star-half-o");
        $(".1-star").addClass("fa-star-o");
    }
}

function increaseMoves(){
    moves++;
    ratingStars();
    $(".moves-number").html(moves);
}