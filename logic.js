// Reference to HTML elements
const highscores = document.getElementById("highscores");
const clearButton = document.getElementById("clear");

// Load scores from local storage
const userScores = JSON.parse(localStorage.getItem("scores")) || [];

// Display scores
function displayScores() {
  highscores.innerHTML = ""; // Clear previous scores

  userScores.forEach((userInfo, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${userInfo.initials}: ${userInfo.score}`;
    highscores.appendChild(listItem);
  });
}

// Event listener for clearing highscores
clearButton.addEventListener("click", function () {
  localStorage.removeItem("scores"); // Clear scores from local storage
  displayScores(); // Update the displayed scores
});

// Display initial scores when the page loads
displayScores();
  