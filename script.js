$(document).ready(function() {
  const apiKey = 'c249681450d348a98e39b4181a756f97';
  let page = 1;
  let currentSearch = '';
  
  const defaultImage = 'assets/news.jpg';

  const fetchNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&page=${page}`;
    if (currentSearch) {
      url = `https://newsapi.org/v2/everything?apiKey=${apiKey}&page=${page}&q=${encodeURIComponent(currentSearch)}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      displayNews(data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const displayNews = (articles) => {
    const newsContainer = $('#newsContainer');
    newsContainer.empty();
    articles.forEach(article => {
      const imgSrc = article.urlToImage ? article.urlToImage : defaultImage;
      const card = `
        <div class="col-md-4">
          <div class="card">
            <img src="${imgSrc}" 
                 class="card-img-top" 
                 alt="${article.title}"
                 onerror="this.src='${defaultImage}';">
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              ${article.description ? `<p class="card-text">${article.description}</p>` : ''}
              <a href="${article.url}" target="_blank" class="btn btn-primary bg-success">Read More</a>
            </div>
          </div>
        </div>
      `;
      newsContainer.append(card);
    });
    page++;
  };

  fetchNews();

  $('#loadNewsBtn').on('click', fetchNews);

  $('#searchBtn').on('click', function() {
    currentSearch = $('#searchInput').val().trim();
    if (currentSearch !== '') {
      page = 1;
      fetchNews();
    }
  });

  $('#searchInput').keypress(function(event){
    const keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      $('#searchBtn').click();
    }
  });
});
