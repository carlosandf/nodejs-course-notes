const BASE_URL = 'http://localhost:12345/movies';

function CardMovie (movie) {
  return (/* html */ `
    <article class="card" data-id="${movie.id}">
    <button class="delete-button">+</button>
      <figure class="movie-img">
        <img src="${movie.poster}" alt="${movie.title}"/>
      </figure>
    </article>
  `);
}

function getMovies (callback) {
  const results = fetch(BASE_URL);

  results
    .then(res => res.json())
    .then(data => callback(data));
}

getMovies((movies) => {
  movies.forEach(movie => {
    const article = document.createRange().createContextualFragment(CardMovie(movie));
    const mainContainer = document.querySelector('main');

    mainContainer?.append(article);
  });
});

document.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const article = e.target.closest('article');
    const id = article.dataset.id;

    fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) {
          article.remove();
        }
      });
  }
});
