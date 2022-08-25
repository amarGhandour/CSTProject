import { Htmlele } from "../Modules/buildHTML.js";


function displayQuestion(counter,data,userAnswers) {
    document.getElementById('question').innerText = `${counter + 1}) ${data.Questions[counter].Header}`;
    let answers = data.Questions[counter].Answers;
    let answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = "";

    for (const index in answers) {
        let div = new Htmlele('div').create({'class':'tab answer'}); // create div with class
        let input = new Htmlele('input').create({ //create input with attr
            'type':'radio',
            'name':'choices',
        })
        let label = new Htmlele('lable').create(); //create lable
        label.innerText = answers[index];


        if (userAnswers[counter] == answers[index]) {
            input.checked = true;
        }


        Htmlele.appendChilds(div,input,label) //appedning 

        div.addEventListener('click',(event)=>{
            event.target.querySelector('input').checked = true
            userAnswers[counter] = event.target.querySelector('lable').innerText;
        })

        answersDiv.appendChild(div);
    }
}


export {displayQuestion}