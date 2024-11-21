

$(document).ready(function() {
    const API_URL = 'https://opentdb.com/api.php?amount=5&type=multiple';
    let questions = [];
    let score = 0;

    
    $.getJSON('https://opentdb.com/api_category.php', function(data) {
        data.trivia_categories.forEach(category => {
            $('#category').append(new Option(category.name, category.id));
        });
    });

    $('#start-quiz').click(function() {
        const category = $('#category').val();
        const difficulty = $('#difficulty').val();
        const url = `${API_URL}&category=${category}&difficulty=${difficulty}`;
        
        $.getJSON(url, function(data) {
            questions = data.results;
            displayQuestions();
        });
    });

    function displayQuestions() {
        $('#quiz-container').empty().show();
        $('#submit-quiz').show();

        questions.forEach((question, index) => {
            const answers = [...question.incorrect_answers, question.correct_answer];
            shuffleArray(answers);

            const questionHTML = `
                <div class="question">
                    <p>${index + 1}. ${question.question}</p>
                    ${answers.map(answer => 
                        `<label><input type="radio" name="question${index}" value="${answer}"> ${answer}</label><br>`
                    ).join('')}
                </div>
            `;
            $('#quiz-container').append(questionHTML);
        });
    }

    $('#submit-quiz').click(function() {
        score = 0;
        questions.forEach((question, index) => {
            const selectedAnswer = $(`input[name="question${index}"]:checked`).val();
            if (selectedAnswer === question.correct_answer) {
                score++;
            }
        });
        $('#score-container').text(`Your Score: ${score}/${questions.length}`);
        $('#quiz-container').hide();
        $('#submit-quiz').hide();
    });

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});
