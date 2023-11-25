var urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
var score =urlParams.get("score");

var scoreBoard=document.getElementById("score-board");
var playAgainButton=document.getElementById("play-again-button");

scoreBoard.innerHTML=score;

// Assuming you have an HTML element with the id "home-button"
var homeButton = document.getElementById("home-button");

homeButton.onclick = (evt) => {
  // Stop the audio when navigating to the next page
  levelpassedSound.pause();
  levelpassedSound.currentTime = 0;

  // Navigate to the login.html page
  location.href = "../loginpage/login.html";
};


const levelpassedSound = new Audio('../sound/levelpassed.mp3');
levelpassedSound.volume = 0.5; 
levelpassedSound.play();


  // Event listener for play again button
playAgainButton.onclick = (evt) => {
    // Stop the audio when navigating to the next page
    levelpassedSound.pause();
    levelpassedSound.currentTime = 0;
  
    location.href = "../instructions/instructions.html";
  };   

  


  var winningPhrases = [
    "Congratulations! You're a Whac-a-Mole champion!",
    "You nailed it! Victory is yours!",
    "Well done! You smashed those moles like a pro!",
    // Add more winning phrases as needed
  ];
  
  var losingPhrases = [
    "Better luck next time!",
    "Oops! Don't worry, you'll get them next round.",
    "Keep trying! You'll conquer the moles soon.",
    // Add more losing phrases as needed
  ];
  
  // Function to get a random phrase based on the score and update HTML
  function updateGameResultHTML(score) {
    var resultElement = document.getElementById("message-box"); // Change "result" to the actual ID of your HTML element
    
  
    // Select a random phrase based on the score
    var randomPhrase = "";
    if (score >= 100) {
      randomPhrase = getRandomPhrase(winningPhrases);
    } else if (score <100) {
      randomPhrase = getRandomPhrase(losingPhrases);
    
      
    } else {
      // Handle the case when the score is less than 10
      randomPhrase = "Try again! You can do better!";
    }
  
    // Update the HTML element with the random phrase
    resultElement.innerHTML = randomPhrase;
  }

  updateGameResultHTML(score);
  
  // Function to get a random phrase from an array
  function getRandomPhrase(phrasesArray) {
    var randomIndex = Math.floor(Math.random() * phrasesArray.length);
    return phrasesArray[randomIndex];
  }
  



