// Define your quiz questions and answers
const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris"
    },
    {
      question: "Which programming language is used for front-end web development?",
      options: ["Java", "Python", "HTML", "JavaScript"],
      correctAnswer: "JavaScript"
    },
  ];
  
  // Define variables
  let currentQuestionIndex = 0;
  let timeLeft = 60; // Initial time for the quiz
  let userScores = JSON.parse(localStorage.getItem('scores')) ||[]
  
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
      } 


     userScores.push(userInfo)
     localStorage.setItem ('scores', JSON.stringify(userScores))

      // Redirect or perform other actions as needed
      window.location.href =  "highscores.html"
    } else { 
      alert("Please enter your initials.");
    }
  } 
  