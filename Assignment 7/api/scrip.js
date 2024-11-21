const API_KEY = "d21e1b93fcb341be95907ca16dcf42c3";
const URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews('Headlines'));

async function fetchNews(query) {
  // console.log(query);

  
//https://newsapi.org/v2/everything?q=tesla&from=2024-10-11&sortBy=publishedAt&apiKey=d21e1b93fcb341be95907ca16dcf42c3
    let res = await fetch(`${URL}${query}&from=2024-10-11&apiKey=${API_KEY}`);

    let data = await res.json();

    console.log(data);
    console.log(data.articles);
    bindNews(data.articles);
}
const bindNews = (articles) => {
    if (articles.length > 0) {
         var str = ``;   
        articles.forEach(article => { 
            str += `
                <div class="col-xl-4 new-card">
        <div class="card" ">
  <img src="${article.urlToImage}" class="card-img-top" alt="News image">
  <div class="card-body">
    <h4 class="card-title">${article.title}</h4>
    <h6>${article.source.name} 🔇${article.publishedAt}</h6>
    <p class="card-text">
    ${article.description}"</p>

    <a href="${article.url}" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
    </div>
             `; 
            document.querySelector('.row').innerHTML = str;  // display news articles in the HTML page using DOM manipulation
    
        })
    }  
}