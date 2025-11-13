const piiForm = document.getElementById('pii');
const piiSubmit = document.getElementById("pii-submit");
const mainForm = document.getElementById('main-form');
const questions = document.querySelectorAll('.question');
let answeredQuestions = 0;

piiForm.addEventListener('submit', (e) => {
    e.preventDefault();

    piiForm.style.display = "none";
    mainForm.style.display = "flex";
});

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

            zero.classList.remove("pressed");

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
        });
        updateStars(0);
    });

    zero.onclick = function zeroStars() {
        if (zero.classList.contains("not-pressed")) {
            questionValue = 0;
            updateStars(0);
            console.log(`${questionValue}`);

            zero.classList.remove("not-pressed");
            clearAnswer.classList.add("not-pressed");

            zero.classList.add("zero-pressed");

            starCount.style.display = "flex";
            starCount.innerHTML = `${questionValue} estrelas`;
            starCount.style.color = "#d00"

            console.log("zero clicked!")
        }
    }

    clearAnswer.onclick = function clearAnswers() {
        if (clearAnswer.classList.contains("not-pressed")) {
            questionValue = -1;
            updateStars(0);
            console.log(`${questionValue}`);

            clearAnswer.classList.remove("not-pressed");
            zero.classList.add("not-pressed");

            zero.classList.remove("zero-pressed");

            starCount.style.display = "none";

            console.log("clearAnswer clicked!")
        }
    }
});

// let questionZeroValue = document.getElementById('question-0').value;

// let piiName = document.getElementById('')

