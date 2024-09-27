const grades = [
    { name: 'sapeur seconde classe', file: 'sa2.png' },
    { name: 'sapeur première classe', file: 'sa1.png' },
    { name: 'caporal', file: 'cpl.png'},
    { name: 'caporal-chef', file: 'cch.png'},
    { name: 'adjudant', file: 'adj.png'},
    { name: 'adjudant-chef', file: 'adc.png'},
    { name: 'lieutenant', file: 'ltn.png'},
    { name: 'capitaine', file: 'cne.png'},
    { name: 'commandant', file: 'cdt.png'},
    { name: 'lieutenant-colonel', file: 'lcl.png'},
    { name: 'colonel', file: 'col.png'},
    { name: 'controleur général', file: 'cgl.png'}
];

const gradeImage = document.getElementById('grade-image');
const gradeInput = document.getElementById('grade-input');
const validateButton = document.getElementById('validate-button');
const normalModeButton = document.getElementById('normal-mode');
const reviseButton = document.getElementById('revise-button');
const backButtonQuiz = document.getElementById('back-to-menu-quiz');
const backButtonRevise = document.getElementById('back-to-menu-revise');
const menu = document.getElementById('menu');
const quiz = document.getElementById('quiz');
const revise = document.getElementById('revise');
const scoreDisplay = document.getElementById('score');

let score = 0;
let attempts = 0;
let usedGrades = [];

function getRandomGrade() {
    let grade;
    do {
        grade = grades[Math.floor(Math.random() * grades.length)];
    } while (usedGrades.includes(grade.name));
    usedGrades.push(grade.name);
    return grade;
}

function displayNewGrade() {
    if (usedGrades.length === grades.length) {
        usedGrades = [];
    }
    const grade = getRandomGrade();
    gradeImage.src = `img-grades/${grade.file}`;
    gradeImage.alt = grade.name;
    gradeInput.value = '';
    gradeInput.classList.remove('correct', 'incorrect');
}

function validateGrade() {
    const currentGrade = grades.find(grade => grade.file === gradeImage.src.split('/').pop()).name;
    gradeInput.classList.remove('correct', 'incorrect'); // Enlever les classes avant de valider
    if (gradeInput.value.toLowerCase() === currentGrade.toLowerCase()) {
        gradeInput.classList.add('correct');
        score++;
    } else {
        gradeInput.classList.add('incorrect');
    }
    attempts++;
    scoreDisplay.textContent = `Score: ${score} / ${attempts}`;
    if (attempts >= 20) {
        alert(`Votre score final est ${score} / 20`);
        resetQuiz();
    } else {
        displayNewGrade();
    }
}

function startQuiz() {
    score = 0;
    attempts = 0;
    usedGrades = [];
    scoreDisplay.textContent = `Score: ${score} / ${attempts}`;
    menu.classList.add('hidden');
    quiz.classList.remove('hidden');
    displayNewGrade();
}

function resetQuiz() {
    menu.classList.remove('hidden');
    quiz.classList.add('hidden');
}

function showRevise() {
    menu.classList.add('hidden');
    revise.classList.remove('hidden');
    displayGradesTable();
}

function hideRevise() {
    revise.classList.add('hidden');
    menu.classList.remove('hidden');
}

function displayGradesTable() {
    const gradesTable = document.getElementById('grades-table');
    gradesTable.innerHTML = `
        <tr>
            <th>Grade</th>
            <th>Nom</th>
        </tr>
    `;
    grades.forEach(grade => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="img-grades/${grade.file}" alt="${grade.name}" class="grade-image"></td>
            <td>${grade.name}</td>
        `;
        gradesTable.appendChild(row);
    });
}

normalModeButton.addEventListener('click', startQuiz);
validateButton.addEventListener('click', function(event) {
    event.preventDefault();
    validateGrade();
});
reviseButton.addEventListener('click', showRevise);
backButtonQuiz.addEventListener('click', resetQuiz);
backButtonRevise.addEventListener('click', hideRevise);

// Afficher le premier grade au chargement de la page
displayNewGrade();