// Define your quiz questions and answers
const questions = [
    {
      question: "Which method is used to add a new element to the end of an array in JavaScript?",
      options: ["push()", "append()", "addToEnd()", "insertLast()"],
      correctAnswer: "push()"
    },
    {
      question: "Which programming language is used for front-end web development?",
      options: ["Java", "Python", "HTML", "JavaScript"],
      correctAnswer: "JavaScript"
    },
    {
      question: "What does the `typeof` operator in JavaScript return when applied to `null`?",
      options: ["Object", "Null", "Undefined", "Number"],
      correctAnswer: "Object"
    },
    {
      question: "What is the correct way to declare a variable in JavaScript?",
      options: ["variable x", "let x", "var x", "const x"],
      correctAnswer: "let x"
    },
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyperlink Transfer Markup Language"],
      correctAnswer: "Hyper Text Markup Language"
    },
    {
      question: "What does CSS stand for?",
      options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
      correctAnswer: "Cascading Style Sheets"
    },
    {
      question: "Which of the following is NOT a JavaScript data type?",
      options: ["Boolean", "String", "Float", "Object"],
      correctAnswer: "Float"
    },
    {
      question: "What does the `===` operator do in JavaScript?",
      options: ["Checks for equality without type conversion", "Checks for equality with type conversion", "Checks for inequality without type conversion", "Checks for inequality with type conversion"],
      correctAnswer: "Checks for equality without type conversion"
    },
  ];
  
  // Define variables
  let currentQuestionIndex = 0;
  let timeLeft = 60; // Initial time for the quiz
  // let userScores = JSON.parse(localStorage.getItem('scores')) ||[]
  
  // Reference to HTML elements
  const startButton = document.getElementById("start");
  const quizContainer = document.getElementById("questions");
  const questionElement = document.getElementById("question-title");
  const optionsContainer = document.getElementById("choices");
  const timerElement = document.getElementById("time");
  const endScreen = document.getElementById("end-screen");
  const scoreDisplay = document.getElementById("final-score");
  const initialsInput = document.getElementById("initials");
  const submitButton = document.getElementById("submit");
  
  // Function to start the quiz
  function startQuiz() {
    startButton.style.display = "none";
    quizContainer.style.display = "block";
    displayQuestion();
    startTimer();
  }
  
  // Function to display a question
  function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    optionsContainer.innerHTML = ""; // Clear previous options
  
    // Create buttons for each answer option
    currentQuestion.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.addEventListener("click", () => checkAnswer(option));
      optionsContainer.appendChild(button);
    });
  }
  
  // Function to check the selected answer
  function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
  
    if (selectedOption === currentQuestion.correctAnswer) {
      // Correct answer, move to the next question
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        displayQuestion();
      } else {
        endQuiz();
      }
    } else {
      // Incorrect answer, subtract time
      timeLeft -= 10; // Subtract 10 seconds as a penalty
      if (timeLeft <= 0) {
        endQuiz();
      }
    }
  }
  
  // Function to start the timer
  function startTimer() {
    const timerInterval = setInterval(() => {
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
    quizContainer.style.display = "none";
    endScreen.style.display = "block";
    scoreDisplay.textContent = `Your Score: ${timeLeft}`;
  }
  
  // Event listeners
  startButton.addEventListener("click", startQuiz);
  submitButton.addEventListener("click", saveScore);
  
  // Function to save the score and initials
  function saveScore() {
    const initials = initialsInput.value.trim();
  
    if (initials !== "") {
     // Save the score and initials in local storage(You can implement your storage logic here)
     const userInfo = {
      initials: initials,
        score: timeLeft
      }; 
 userScores.push(userInfo)
      localStorage.setItem ('scores', JSON.stringify(userScores));

      // Redirect or perform other actions as needed
      window.location.href =  "highscores.html";
    } else { 
      alert("Please enter your initials.");
    }
  }

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
 