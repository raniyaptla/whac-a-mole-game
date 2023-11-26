
var time = 10;
var timerId;
let score = 0;

// //
// document.addEventListener('DOMContentLoaded', function () {
//     setTimeout(function () {
//         document.getElementById('popup').style.display = 'none';
//     }, 2000);
// });


function validateForm() {
    var username = document.getElementById("username").value;
    var nickname = document.getElementById("nickname").value;

    // Store the name and nickname in local storage
    localStorage.setItem("username", username);
    localStorage.setItem("nickname", nickname);

    // Redirect to game.html
    window.location.href = "../instructions/instruction.html";

    // Prevent form submission 
    return false;
}



// Check if the nickname is present in local storage
var storedNickname = localStorage.getItem("nickname");

// Display the nickname in the HTML element with id "nicknameDisplay"
var nicknameDisplay = document.getElementById("nicknameDisplay");

if (storedNickname) {
    nicknameDisplay.innerHTML = `PLAYER : ${storedNickname}`;
} else {
    nicknameDisplay.innerHTML = "Nickname not found in local storage.";
}

function startTimer() {
    time = 10;
    updateTimerDisplay();

    timerId = setInterval(() => {
        time--;
        updateTimerDisplay();

        if (time === 0) {
            clearInterval(timerId);

            location.href = "../gameover/gameover.html?score=" + score;
        } else {
            const randomBoxId = getRandomBoxId();
            showMole(randomBoxId);
        }
    }, 1000);
}

function updateTimerDisplay() {
    timer.innerHTML = time;
}

// // Call this function to reset the timer
// function resetTime() {
//     clearInterval(timerId);
//     startTimer();
// }

var timer = document.getElementById('timer');

startTimer();


const moleClickSound = new Audio('../sound/mole.mp3');
const scoreUpdateSound = new Audio('../sound/scoremole.mp3');

function getRandomBoxId() {
    const boxIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const randomIndex = Math.floor(Math.random() * boxIds.length);
    return boxIds[randomIndex];
}
function showMole(boxId) {
  const mole = document.getElementById(boxId).querySelector('.mole-hide');
  mole.style.display = 'block';
  mole.style.opacity = '1';

  let timeoutId;

  function updateScoreDisplay() {
      const scoreValueElement = document.getElementById('scoreValue');
      scoreValueElement.innerHTML = score;
  }

  function handleInteraction() {
      if (boxId === '5') {
          console.log("one");
          setTimeout(() => {
              whac.style.transform = "rotateZ(0deg) rotateY(-180deg)";
              // Nested setTimeout for the second transformation
              setTimeout(() => {
                  whac.style.transform = "rotateZ(-50deg) rotateY(-180deg)";
              }, 70);
          }, 70);

          score += 50;
          scoreUpdateSound.play();
      } else {
          console.log("two");
          setTimeout(() => {
              whac.style.transform = "rotateZ(0deg) rotateY(-180deg)";
              // Nested setTimeout for the second transformation
              setTimeout(() => {
                  whac.style.transform = "rotateZ(-50deg) rotateY(-180deg)";
              }, 70);
          }, 70);

          score += 10;
          moleClickSound.play();
      }

      // Update the score display
      updateScoreDisplay();

      // Hide the mole immediately when clicked or touched
      mole.style.opacity = '0';

      // Clear the timeout to prevent the mole from disappearing after 2 seconds
      clearTimeout(timeoutId);

      // Remove the event listener to prevent further clicks or touches
      mole.removeEventListener('click', handleInteraction);
      mole.removeEventListener('touchstart', handleInteraction);
  }

  // Add click and touchstart event listeners to the mole
  mole.addEventListener('click', handleInteraction);
  mole.addEventListener('touchstart', handleInteraction);

  // Set a timeout to hide the mole after 2 seconds
  timeoutId = setTimeout(() => {
      mole.style.display = 'block';
      mole.style.opacity = '0';
      mole.removeEventListener('click', handleInteraction);
      mole.removeEventListener('touchstart', handleInteraction);
  }, 1000);
}

const whac = document.getElementById("whac");

// Set initial rotation
whac.style.transform = "rotateZ(-50deg) rotateY(-180deg)";

// Add mousemove event listener
window.addEventListener("mousemove", (e) => {
    whac.style.left = e.pageX + "px";
    whac.style.top = e.pageY - 60 + "px";
});


