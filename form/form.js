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

questions.forEach(question => {
    const ratingSliders = question.querySelectorAll('.rating');

    ratingSliders.forEach(ratingSlider => {
        ratingSlider.addEventListener('input', () => {
            const test = question.querySelector('.test')
            test.innerHTML = ratingSlider.value
        })
    })

    const clearStars = question.querySelector('.clear-stars');

    const clearAnswer = question.querySelector('.clear-answer')
});

// let questionZeroValue = document.getElementById('question-0').value;

// let piiName = document.getElementById('')

