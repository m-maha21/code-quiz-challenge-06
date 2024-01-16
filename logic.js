document.addEventListener("DOMContentLoaded", function () {
    // Reference to HTML elements
    const startButton = document.getElementById("start");
    const timerElement = document.getElementById("time");
    const startScreen = document.getElementById("start-screen");
    const questionsContainer = document.getElementById("questions");
    const questionTitle = document.getElementById("question-title");
    const choicesContainer = document.getElementById("choices");
    const endScreen = document.getElementById("end-screen");
    const finalScore = document.getElementById("final-score");
    const initialsInput = document.getElementById("initials");
    const submitButton = document.getElementById("submit");
    const feedbackElement = document.getElementById("feedback");
  
    // Variables
    let currentQuestionIndex = 0;
    let timeLeft = 75; // Initial time for the quiz
    let timerInterval;
  
    // Function to start the quiz
    function startQuiz() {
      startScreen.classList.add("hide");
      questionsContainer.classList.remove("hide");
      displayQuestion();
      startTimer();
    }
  
    // Function to display a question
    function displayQuestion() {
      const currentQuestion = questions[currentQuestionIndex];
      questionTitle.textContent = currentQuestion.question;
  
      choicesContainer.innerHTML = ""; // Clear previous choices
  
      // Create buttons for each answer option
      currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.textContent = `${index + 1}. ${choice}`;
        button.addEventListener("click", () => checkAnswer(index));
        choicesContainer.appendChild(button);
      });
    }
  
    // Function to check the selected answer
    function checkAnswer(choiceIndex) {
      const currentQuestion = questions[currentQuestionIndex];
  
      if (choiceIndex === currentQuestion.correctIndex) {
        // Correct answer, move to the next question
        feedbackElement.textContent = "Correct!";
      } else {
        // Incorrect answer, subtract time
        feedbackElement.textContent = "Wrong!";
        timeLeft -= 10; // Subtract 10 seconds as a penalty
      }
  
      currentQuestionIndex++;
  
      if (currentQuestionIndex < questions.length) {
        displayQuestion();
      } else {
        endQuiz();
      }
    }
  
    // Function to start the timer
    function startTimer() {
      timerInterval = setInterval(() => {
        timerElement.textContent = `Time: ${timeLeft}`;
  
        if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
          clearInterval(timerInterval);
          endQuiz();
        } else {
          timeLeft--;
        }
      }, 1000);
    }
  
    // Function to end the quiz
    function endQuiz() {
      clearInterval(timerInterval);
      questionsContainer.classList.add("hide");
      endScreen.classList.remove("hide");
      finalScore.textContent = timeLeft;
    }
  
    // Event listeners
    startButton.addEventListener("click", startQuiz);
  
    submitButton.addEventListener("click", function () {
      const initials = initialsInput.value.trim();
  
      if (initials !== "") {
        // Save the score and initials (You can implement your storage logic here)
        alert(`Score saved! Initials: ${initials}, Score: ${timeLeft}`);
        // Redirect or perform other actions as needed
      } else {
        alert("Please enter your initials.");
      }
    });
  });
  