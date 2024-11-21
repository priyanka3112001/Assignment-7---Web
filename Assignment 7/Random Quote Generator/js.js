document.addEventListener('DOMContentLoaded', function () {
    const quoteContainer = document.getElementById('quote-container');
    const quoteText = document.getElementById('quote');
    const authorText = document.getElementById('author');
    const newQuoteButton = document.getElementById('new-quote');
    const tagSelect = document.getElementById('tag');

    const API_URL = 'https://api.quotable.io/random';

    function fetchQuote() {
        const tag = tagSelect.value;
        const url = tag ? `${API_URL}?tags=${tag}` : API_URL;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                quoteText.textContent = `"${data.content}"`;
                authorText.textContent = `— ${data.author}`;
            })
            .catch(error => {
                quoteText.textContent = "Sorry, we couldn't fetch a quote at this time.";
                authorText.textContent = "";
                console.error("Error fetching quote:", error);
            });
    }

    newQuoteButton.addEventListener('click', fetchQuote);

    tagSelect.addEventListener('change', fetchQuote);
    fetchQuote();
});
