const piiForm = document.getElementById('pii');
const piiSubmit = document.getElementById("pii-submit");
const mainForm = document.getElementById('main-form');

const sticky = document.getElementById('sticky-header');

const mainFormSend = document.getElementById('main-form-send');
mainFormSend.disabled = true
mainFormSend.classList.remove('completo')
mainFormSend.classList.add('incompleto')
mainFormSend.innerHTML = "Enviar incompleto"

const qs1 = document.getElementById('qs-1');
const qs2 = document.getElementById('qs-2');
const qs3 = document.getElementById('qs-3');

document.getElementById('backward').disabled = true

const questions = document.querySelectorAll('.question');
let answeredQuestions = 0;

piiForm.addEventListener('submit', (e) => {
    e.preventDefault();

    piiForm.style.display = "none";
    mainForm.style.display = "flex";
    sticky.style.display = "block";
});

function checkSend() {
    if (answeredQuestions < 5) {
        mainFormSend.disabled = true
        mainFormSend.classList.remove('completo')
        mainFormSend.classList.add('incompleto')
        mainFormSend.innerHTML = "Enviar incompleto"
        console.log(':(')

    } else if (answeredQuestions >= 5 && answeredQuestions < 12) {
        mainFormSend.disabled = false
        mainFormSend.classList.remove('completo')
        mainFormSend.classList.add('incompleto')
        mainFormSend.innerHTML = "Enviar incompleto"
        console.log(':|')

        // mainFormSend.setAttribute(onclick, incompleteSend())
    } else {
        mainFormSend.disabled = false
        mainFormSend.classList.remove('incompleto')
        mainFormSend.classList.add('completo')
        mainFormSend.innerHTML = "Enviar"
        console.log(':)')

        // mainFormSend.setAttribute(onclick, completeSend())
    };
}

// PRO BANCO DE DADOS:
// -1: questão pulada
// 0: zero estrelas
questions.forEach(question => {
    let questionValue = -1
    console.log(`${questionValue}`);
    
    const ratingRadios = question.querySelectorAll('.rating-radio');
    const starIcons = question.querySelectorAll('star-icon')

    const s1 = question.querySelector(".s1")
    const s2 = question.querySelector(".s2")
    const s3 = question.querySelector(".s3")
    const s4 = question.querySelector(".s4")
    const s5 = question.querySelector(".s5")
        
    const stars = [s1, s2, s3, s4, s5];

    const starCount = question.querySelector('.star-count');
    starCount.style.display = "none"

    const zero = question.querySelector('.zero');
    const clearAnswer = question.querySelector('.clear-answer');

    function updateStars(value) {
        stars.forEach((star, index) => {
        if (index < value) {
            star.src = "star-full.webp";
        } else {
            star.src = "star-empty.webp";
        }});

        for(var i = 0; i < stars.length; i++){
            if (questionValue <= -1) {
                stars[i].style.opacity = 0.4;
            } else {
                stars[i].style.opacity = 100;
            };
        };
    };

    ratingRadios.forEach(ratingRadio => {
        ratingRadio.addEventListener('input', () => {
            questionValue = parseInt(ratingRadio.value);
            updateStars(questionValue);
            console.log(`${questionValue}`);

            zero.disabled = false;
            zero.classList.remove("pressed");
            clearAnswer.classList.remove("pressed");

            starCount.style.display = "flex";

            if (questionValue == 1 ) {
                starCount.innerHTML = `${questionValue} estrela`;
            } else {
                starCount.innerHTML = `${questionValue} estrelas`;
            } 

            switch (questionValue) {
                case 1:
                    starCount.style.color = "#ff8400";
                    break;
                case 2:
                    starCount.style.color = "#a4a400"
                    break;
                case 3:
                    starCount.style.color = "#3cc200"
                    break;
                case 4:
                    starCount.style.color = "#00b79c"
                    break;
                case 5:
                    starCount.style.color = "#007fff"
                    break;
                default:
                    starCount.style.color = "#d00"
            }

            if (!question.classList.contains("answered")) {
                question.classList.add("answered");
                answeredQuestions++;
                console.log("answeredQuestions: " + answeredQuestions)
            };
            checkSend();
        });
        updateStars(0);
    });

    zero.onclick = function zeroStars() {
        if (!zero.classList.contains("pressed")) {
            questionValue = 0;
            updateStars(0);
            console.log(`${questionValue}`);

            zero.classList.add("pressed");
            clearAnswer.classList.remove("pressed");

            zero.disabled = true;

            starCount.style.display = "flex";
            starCount.innerHTML = `${questionValue} estrelas`;
            starCount.style.color = "#d00"

            console.log("zero clicked!")

            if (!question.classList.contains("answered")) {
                question.classList.add("answered");
                answeredQuestions++;
                console.log("answeredQuestions: " + answeredQuestions)
            };
            checkSend();
        }
    }

    clearAnswer.onclick = function clearAnswers() {
        if (!clearAnswer.classList.contains("pressed")) {
            questionValue = -1;
            updateStars(0);
            console.log(`${questionValue}`);

            clearAnswer.classList.add("pressed");
            zero.classList.remove("pressed");

            zero.disabled = false;

            starCount.style.display = "none";

            console.log("clearAnswer clicked!")

            if (question.classList.contains("answered")) {
                question.classList.remove("answered");
                answeredQuestions--;
                console.log("answeredQuestions: " + answeredQuestions)
            };
            checkSend();
        }
    }
});

function backward() {
    if (qs3.style.display == "block") {
        qs2.style.display = "block";
        document.getElementById('forward').disabled = false;
        document.getElementById('progress-bar-colour').style.width = "50%"
        qs3.style.display = "none";
    } else {
        qs1.style.display = "block";
        document.getElementById('backward').disabled = true;
        document.getElementById('progress-bar-colour').style.width = "5%"
        qs2.style.display = "none";
    }
}

function forward() {
    if (qs1.style.display == "block") {
        qs2.style.display = "block";
        document.getElementById('backward').disabled = false;
        document.getElementById('progress-bar-colour').style.width = "50%"
        qs1.style.display = "none";
    } else {
        qs3.style.display = "block";
        document.getElementById('forward').disabled = true;
        document.getElementById('progress-bar-colour').style.width = "100%"
        qs2.style.display = "none";
    }
}