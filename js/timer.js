
export let timer = function (minutesElement, secondsElement, callback){
    let endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() + Number(minutesElement.innerText));
    endTime = new Date(endTime);

    function myTimer() {
        let now = new Date();
        let diff = endTime - now;
        let remainingTime = new Date(diff);

        let minutes = remainingTime.getMinutes() < 10? `0${remainingTime.getMinutes()}`: remainingTime.getMinutes();
        let seconds = remainingTime.getSeconds() < 10? `0${remainingTime.getSeconds()}`: remainingTime.getSeconds();

        minutesElement.innerHTML = minutes + '';
        secondsElement.innerHTML = seconds + '';

        if (diff <= 0){
            clearInterval(timerInterval);
            callback();
        }

    }
    myTimer();
    let timerInterval =  setInterval(myTimer, 1000);
}

