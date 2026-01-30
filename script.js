const jsMCQs = [
    {
        id: 1,
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "int", "string", "float"],
        answer: "var"
    },
    {
        id: 2,
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: ["<!-- -->", "//", "/* */", "#"],
        answer: "//"
    },
    {
        id: 3,
        question: "Which data type is NOT supported by JavaScript?",
        options: ["Number", "Boolean", "Character", "String"],
        answer: "Character"
    },
    {
        id: 4,
        question: "Which method is used to print data in the console?",
        options: ["print()", "log()", "console.log()", "display()"],
        answer: "console.log()"
    },
    {
        id: 5,
        question: "Which operator is used to compare both value and type?",
        options: ["==", "=", "===", "!="],
        answer: "==="
    },
    {
        id: 6,
        question: "What will `typeof null` return?",
        options: ["null", "object", "undefined", "number"],
        answer: "object"
    },
    {
        id: 7,
        question: "Which function converts JSON data to a JavaScript object?",
        options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.object()"],
        answer: "JSON.parse()"
    },
    {
        id: 8,
        question: "Which loop is guaranteed to execute at least once?",
        options: ["for", "while", "do...while", "foreach"],
        answer: "do...while"
    },
    {
        id: 9,
        question: "Which keyword is used to create a function?",
        options: ["function", "method", "def", "func"],
        answer: "function"
    },
    {
        id: 10,
        question: "Which array method adds an element at the end?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        answer: "push()"
    }
];

const qusList = document.querySelector('.left-section .qus-list ul');
const qusList2 = document.querySelector('.right-section .qus-buttons');
let userAnswers = {};
const submitBtn = document.getElementById("submitBtn");
    const timer = document.querySelector('.timer');

jsMCQs.forEach((value, index) => {
    let qus = document.createElement('li');
    qus.classList.add('px-2', 'py-1');
    qus.innerHTML = `
        <button class="btn btn-primary w-100">${index + 1}</button>
    `
    qusList.appendChild(qus);

    let button = document.createElement('button');
    button.textContent = index + 1;
    qusList2.appendChild(button);
})

const qus1Buttons = document.querySelectorAll('.left-section .qus-list ul button');
const displayQus = document.querySelector('.middle-section .card-header h3');
const displayAns = document.querySelector('.middle-section .card-body ul');
qus1Buttons.forEach((button) => {
    button.addEventListener('click', function (e) {
        displayAns.innerHTML = ''
        let value = e.target.textContent;
        displayQus.textContent = jsMCQs[value - 1].question;
        jsMCQs[value - 1].options.forEach((option) => {
            let li = document.createElement('li');
            li.innerHTML = `
                <input type="radio" name="option" value=${option} /> <label>${option}</label> 
            `
            displayAns.appendChild(li);
        })
    })
})

let currentIndex = 0;

function renderQuestion(index) {
    if (index < 0 || index >= jsMCQs.length) return;

    displayAns.innerHTML = '';
    displayQus.textContent = jsMCQs[index].question;

    jsMCQs[index].options.forEach(option => {
        let li = document.createElement('li');
        li.innerHTML = `
            <input type="radio" name="option" value="${option}">
            <label>${option}</label>
        `;
        displayAns.appendChild(li);
    });

    currentIndex = index;
}
qus1Buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        renderQuestion(index);
    });
});

function next() {
    if (currentIndex < jsMCQs.length - 1) {
        renderQuestion(currentIndex + 1);
    }
}

function prev() {
    if (currentIndex > 0) {
        renderQuestion(currentIndex - 1);
    }
}


function renderQuestion(index) {
    if (index < 0 || index >= jsMCQs.length) return;

    displayAns.innerHTML = '';
    displayQus.textContent = jsMCQs[index].question;

    jsMCQs[index].options.forEach(option => {
        let li = document.createElement('li');

        let checked = userAnswers[index] === option ? "checked" : "";

        li.innerHTML = `
            <input type="radio" name="option" value="${option}" ${checked}>
            <label>${option}</label>
        `;

        li.querySelector('input').addEventListener('change', (e) => {
            userAnswers[index] = e.target.value;
        });

        displayAns.appendChild(li);
    });

    currentIndex = index;
}

submitBtn.addEventListener("click", () => {
    let score = 0;
    let total = jsMCQs.length;

    jsMCQs.forEach((question, index) => {
        if (userAnswers[index] === question.answer) {
            score++;
        }
    });

    let resultHTML = `
        <h3 class="text-warning">Result</h3>
        <p>Total Questions: ${total}</p>
        <p>Correct Answers: ${score}</p>
        <p>Wrong Answers: ${total - score}</p>
        <h4 class="text-success">Score: ${score} / ${total}</h4>
    `;

    document.querySelector(".right-section .qus-buttons").innerHTML = resultHTML;
});
    let count = 0;
    let min = 0;
    let intervalId = setInterval(() => {
        let prefix = '';
        ++count;

        let minText = '';
        if (min < 10) {
            minText = `0${min}:`
        } else {
            minText = min;
        }

        if (count < 10) {
            if(min < 10){
                prefix = `0${min}:0`;
            }else{
                prefix = `${min}:0`;
            }
            prefix += count;
        } else {
            prefix = minText + count;
        }
        timer.textContent = prefix;
        if (count == 60) {
            count = 0;
            min++;
        }
    }, 1000)

