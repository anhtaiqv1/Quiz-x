var questions = [{
  number : 1,
  question : "Câu hỏi  :Bạn có 2 ô tô thêm 3 ô tô thì bạn có tổng bằng bao nhiêu ?",
  answer : 0,
  options:[
      "A. Có 5",
      "B. Có 4",
      "C. Có 6",
      "D. Có 7"
  ]
},
{
  number : 2,
  question : "Câu hỏi : 15 *5 bằng bao nhiêu ?" ,
  answer : 1,
  options:[
      "A.  = 65",
      "B. = 75",
      "C.  = 55",
      "D.  = 85"
  ]
},
{
  number : 3,
  question :"Câu hỏi : 4*2 bằng bao nhiêu ?",
  answer : 1,
  options:[
      "A. = 7",
      "B. = 8",
      "C.  = 9",
      "D. = 10"
  ]
},
{
  number : 4,
  question : "Câu hỏi : 2*3 bằng bao nhiêu ?",
  answer : 0,
  options:[
      "A.  = 6",
      "B.  = 7",
      "C. = 8",
      "D. = 9"
  ]
},
{
  number : 5,
  question : "Câu hỏi : 5*5 bằng bao nhiêu ?",
  answer : 3,
  options:[
      "A. = 21",
      "B. = 22",
      "C. = 23",
      "D.  = 25"
  ]
},
{
  number : 6,
  question : "Câu hỏi : 5*6 bằng bao nhiêu ?",
  answer : 1,
  options:[
      "A. = 28",
      "B. = 30",
      "C. = 32",
      "D. = 29"
  ]
},
{
  number : 7,
  question : "Câu hỏi  :7*5 bằng bao nhiêu ?",
  answer : 2,
  options:[
      "A. = 32",
      "B. = 34",
      "C. = 35",
      "D.  = 33"
  ]
},
{
  number : 8,
  question : "Câu hỏi  : 8*5 bằng bao nhiêu ?",
  answer : 1,
  options:[
      "A. = 39",
      "B. = 40",
      "C. = 41",
      "D. = 42"
  ]
}
]
var currentQuestion = 0;
var score = 0 ;
var questionSet = [];

var optionQuizs = document.getElementsByClassName("option");
var submitBtn = document.getElementById("submit-btn");
var resultQuiz = document.getElementById("result");
var questionQuiz = document.getElementById("question");
var optionInput = document.createElement("input");



function showQuestions() {
  var storedQuestions = JSON.parse(localStorage.getItem('questions'));
  var divquestion = document.createElement("div");
  var resultQuiz = document.getElementById("result");

  divquestion.setAttribute("class","questions");
  
  if (storedQuestions && storedQuestions.length === 5) {
    displayQuestions(storedQuestions, divquestion);
  } else {
    var questionIds = getRandomQuestionIds(5);
    var questionData = [];

    questionIds.forEach((questionId, index) => {
      var question = questions.find(q => q.number == questionId);

      if (question) {
        var questionElement = createQuestionElement(question, index);
        divquestion.appendChild(questionElement);

        var questionDataItem = {
          question: question.question,
          option: question.options,
          number: question.number,
        };
        questionData.push(questionDataItem);
      }
    });

    saveQuestions(questionData);
  }

  resultQuiz.appendChild(divquestion);
}

function displayQuestions(questionsData, containerElement) {
  questionsData.forEach((storedQuestion, index) => {
    var question = questions.find(q => q.number == storedQuestion.number);
    if (question) {
      var questionElement = createQuestionElement(question, index);
      containerElement.appendChild(questionElement);
    }
  });
}

function createQuestionElement(question, index) {
  var questionElement = document.createElement("div");
  questionElement.textContent = "Câu hỏi " + (index + 1) + ": " + question.question;

  var optionsElement = document.createElement("ul");

  question.options.forEach((option, optionIndex) => {
    var optionItem = document.createElement("li");

    var optionInput = document.createElement("input");
    optionInput.setAttribute("type", "radio");
    optionInput.setAttribute("name", "question_" + question.number);
    optionInput.setAttribute("data-questionId", question.number);
    optionInput.setAttribute("data-answerIndex", optionIndex);
    optionInput.setAttribute("id", "option_" + optionIndex + "-" + question.number);

    var optionLabel = document.createElement("label");
    optionLabel.setAttribute("for", "option_" + optionIndex + "-" + question.number);
    optionLabel.textContent = option;

    optionItem.appendChild(optionInput);
    optionItem.appendChild(optionLabel);
    optionsElement.appendChild(optionItem);
  });

  questionElement.appendChild(optionsElement);
  return questionElement;
}

function getRandomQuestionIds(numberOfQuestions) {
  var questionIds = [];

  while (questionIds.length < numberOfQuestions) {
    var randomId = Math.ceil(Math.random() * questions.length);
    if (!questionIds.includes(randomId)) {
      questionIds.push(randomId);
    }
  }

  return questionIds;
}

function saveQuestions(questionData) {
  var serializedQuestions = JSON.stringify(questionData);
  localStorage.setItem('questions', serializedQuestions);
}



function handleSubmit() {
  var checkedQuestions = document.querySelectorAll('input[type="radio"]:checked');
  var incorrectAnswers = [];

  checkedQuestions.forEach((item) => {
    var questionId = item.getAttribute('data-questionId');
    const question = questions.find(q => q.number == questionId);
    var answerIndex = item.getAttribute('data-answerIndex');

    if (question.answer == answerIndex) {
      score += 1;
    } else {
      incorrectAnswers.push({
        question: question.question,
        correctAnswer: question.options[question.answer],
      });
    }
  });

  storedAnswerIds = JSON.parse(localStorage.getItem('questions'));

  if (checkedQuestions.length <=4) {
    alert('Có câu hỏi trong bài bạn chưa trả lời mời bạn kiểm tra lại !');
  } else {
    showResult(score, storedAnswerIds.length);
    showIncorrectAnswers(incorrectAnswers);

    var resetBtn = document.getElementById("reset-btn");
    resetBtn.style.display = "block";


  }
}


function showIncorrectAnswers(incorrectAnswers) {
  if (incorrectAnswers.length > 0) {
    var notificationContent = 'Câu hỏi bạn trả lời sai:\n';
    incorrectAnswers.forEach((incorrectAnswer, index) => {
      notificationContent += `${index + 1}. ${incorrectAnswer.question}\n`;
      notificationContent += ` - Câu trả lời đúng: ${incorrectAnswer.correctAnswer}\n`;
    });
    alert(notificationContent);
  } else {
    alert('Bạn đã trả lời đúng tất cả câu hỏi.');
  }
}


function showResult(score, totalQuestions) {
  var resultQuiz = document.getElementById("result");
  submitBtn.disabled = true;
  resultQuiz.textContent = "Điểm: " + score + "/" + totalQuestions;
}

function resetQuiz() {
  resultQuiz.textContent = "";
  alert("Bạn có muốn làm lại không ?");
  submitBtn.disabled = false;
  score = 0;
  var resetBtn = document.getElementById("reset-btn");
  localStorage.removeItem("questions");
  var questionElements = document.querySelectorAll("div");
  resetBtn.style.display = "none";

  questionElements.forEach((element) => {
    element.parentNode.removeChild(element);
  });

  showQuestions();
}

var resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", resetQuiz);

submitBtn.addEventListener("click", handleSubmit);

showQuestions();
