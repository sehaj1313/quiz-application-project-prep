// Quiz data containing questions, options, and correct answers
const quizData = [
    {
      question: "Which is the longest river on the earth",
      options: ["Yamuna", "Kaveri", "Nile", "Narmada"],
      correctAnswer: "Nile"
    },
    {
      question: "Who is known as Father of Indian Constitution?",
      options: ["Mahatma Gandhi", "Dr. B. R. Ambedkar", "Dr. Rajendra Prasad", "Sardar Vallabh Bhai Patel"],
      correctAnswer: "Dr. B. R. Ambedkar"
    },
    // Add more questions here
  ];
  
  // Initialize variables
  let currentQuestionIndex = 0;
  let score = 0;
  let timer = 30;
  const timerElement = document.getElementById('timer');
  const scoreElement = document.getElementById('score');
  const questionNumberElement = document.getElementById('questionNumber');
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const submitButton = document.querySelector('.submit-btn');
  
  // Function to display current question and options
  function displayQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionNumberElement.textContent = currentQuestionIndex + 1;
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
      const optionButton = document.createElement('button');
      optionButton.textContent = option;
      optionButton.className = 'option';
      optionButton.id = `option${index + 1}`;
      optionButton.addEventListener('click', () => selectOption(optionButton));
      optionsElement.appendChild(optionButton);
    });
  }
  
  // Function to select an option
  function selectOption(optionButton) {
    const selectedOption = optionButton.textContent;
    document.querySelectorAll('.option').forEach(btn => {
      btn.disabled = true;
    });
    if (selectedOption === quizData[currentQuestionIndex].correctAnswer) {
      score++;
      scoreElement.textContent = score;
      optionButton.style.backgroundColor = '#5cb85c';
    } else {
      optionButton.style.backgroundColor = '#d9534f';
    }
  }
  
  // Function to move to the next question
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      displayQuestion();
      document.querySelectorAll('.option').forEach(btn => {
        btn.disabled = false;
        btn.style.backgroundColor = '#f0f0f0';
      });
    } else {
      // Quiz ended
      clearInterval(intervalId);
      questionNumberElement.textContent = '';
      questionElement.textContent = 'Quiz ended!';
      optionsElement.innerHTML = '';
      submitButton.style.display = 'none';
    }
  }
  
  // Display first question
  displayQuestion();
  
  // Timer countdown
  const intervalId = setInterval(() => {
    timer--;
    timerElement.textContent = timer;
    if (timer === 0) {
      clearInterval(intervalId);
      nextQuestion();
    }
  }, 1000);
  