import { data } from "./quiz.js";
import { timer } from "./timer.js";
import { displayQuestion } from "./myFuns/question.js";
import { getCookies } from './myFuns/cookies.js';

let counter = 0;
let userAnswers = {};

let startContent = document.getElementById('startcontent');
let examContent = document.getElementById('exam');
let startButton = document.getElementById('start-btn');
let finishButtons = document.getElementsByClassName('finish');
let gradeContent = document.getElementById('grade');
let minutes = document.getElementsByClassName('minutes')[0];
let seconds = document.getElementsByClassName('seconds')[0];
minutes.innerText = data.QuizTime;


//check if user login or already finish the exam
let stdInfo = getCookies();
// alert(stdInfo.studentName.length)
if (stdInfo.studentName) {
    if ((stdInfo.studentName.length) < 1)
        window.location = 'login.html'
} else {
    window.location = 'login.html'
}



// start page
let studentNameElements = document.getElementsByClassName('studentName');
Array.from(studentNameElements).forEach((element) => {
    element.innerHTML = stdInfo.studentName;
});


displayQuestion(counter, data, userAnswers)

// start button
startButton.addEventListener('click', function () {
    startContent.style.display = 'none';
    examContent.style.display = 'block';
    document.getElementById('nextdiv').style.display = 'block';
    startButton.style.display = 'none';
    displayQuestion(counter, data, userAnswers)

    Array.from(finishButtons).forEach((btn) => btn.addEventListener('click', handleFinishButton));



    timer(minutes, seconds, finishExam);
});

// next
let nextButton = document.getElementById('next');
nextButton.addEventListener('click', getNext);

// back
let backButton = document.getElementById('back');
backButton.addEventListener('click', getBack);



function getNext() {

    let checkedChoice = document.querySelector('input[name="choices"]:checked');
    let error = document.getElementsByClassName('err')[0];
    if (!checkedChoice) {
        error.style.display = 'block';
    } else {
        error.style.display = 'none';
        backButton.style.display = 'inline-block';
        counter++;
        if (counter >= data.Questions.length - 1) {
            counter = data.Questions.length - 1;
            nextButton.style.display = 'none';
            document.getElementsByClassName('finish')[1].style.display = 'block';
        }
        console.log(counter);
        displayQuestion(counter, data, userAnswers)
    }

}

function getBack() {
    nextButton.style.display = 'inline-block';
    counter--;
    if (counter <= 0) {
        counter = 0;
        backButton.style.display = 'none';
    }
    console.log(userAnswers)
    displayQuestion(counter, data, userAnswers)
}

function handleFinishButton(event) {
    if (confirm("Are you sure ?"))
        finishExam();
    else
        event.preventDefault();
}

function finishExam() {
    let result = 0;
    for (let i = 0; i <= counter; i++) {
        if (userAnswers[i] === data.Questions[i].Correctanswer)
            result += data.Questions[i].Degree;
    }
    examContent.style.display = "none";
    gradeContent.style.display = "block";
    document.getElementById('yourgrade').innerText = `${result}/${data.TotalDegree}`;
    document.getElementsByClassName('footer')[0].innerHTML = "";
    document.getElementsByClassName('timer')[0].style.display = 'none';
    Array.from(finishButtons).forEach((btn) => btn.removeEventListener('click', handleFinishButton));

    document.cookie = `studentName=`;
}


