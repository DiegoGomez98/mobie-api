iconSearch.addEventListener('click', () => {
  location.hash = `search=${inputsearch.value}`;
})

trending_btn.addEventListener('click', () => {
  location.hash = 'trends'
})

header_arrow_button.addEventListener('click', () => {
  location.hash = window.history.back();
})

topRated_btn.addEventListener('click', () => {
  location.hash = 'topRated'
})

window.addEventListener('DOMContentLoaded', navigator, false);

window.addEventListener('hashchange', navigator, false);
// la función que queremos ejecutar cada vez que cambie el hash

function navigator() {
  console.log({ location });
  
  if (location.hash.startsWith('#trends')) {
    TrendsPage();
    // el método startsWith nos permite preguntarle a un string si empieza de cierta forma
    // en este caso se mostrará la lista de tendencia completa de trends solo si el hash de la URL empieza por '#trends'
  } else if (location.hash.startsWith('#search=')) {
    searchPage();
  } else if (location.hash.startsWith('#movie=')) {
    movieDetailsPage();
  } else if (location.hash.startsWith('#category=')) {
    categoriesPage();
  } else if (location.hash.startsWith('#topRated')) {
    topRatedPage();
  } else {
    homePage();
  }
  // location.hash
  // aquí leemos el hash para que dependiendo del resultado que nos dé, mostrar una sección u otra

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
// esta función la vamos a llamar cuando cargue la app y cada vez que cambie el hash

function homePage() {
  console.log('algo salió mal, estás en el Home');

  header.classList.remove('header-container--long');
  header.style.background = ('');
  header_arrow.classList.add('inactive');
  header_articule_Sleft_title.classList.remove('inactive');
  header_articule_Sleft_title.classList.remove('header_articule_Sleft-title--categoryView');
  header_articule_Sleft_title_categoryView.classList.add('inactive');

  search.classList.remove('inactive');
  categories.classList.remove('inactive');
  trending.classList.remove('inactive');
  topRated.classList.remove('inactive');
  general.classList.add('inactive');
  movieDetail.classList.add('inactive');
  SimilarMovies.classList.add('inactive');

  getTrendingMoviesPreview();
  getCategoriesMoviesPreview();
  getTopRatedPreview();
}

function categoriesPage() {
  console.log('muy bien, estamos en CATEGORIES');

  header.classList.remove('header-container--long');
  header.style.background = ('');
  header_arrow.classList.remove('inactive');
  header_articule_Sleft_title.classList.add('inactive');
  header_articule_sLeft_text.classList.add('inactive');
  header_articule_Sleft_title_categoryView.classList.remove('inactive');
  header_articule_sRight_image.classList.add('inactive');

  search.classList.add('inactive');
  categories.classList.add('inactive');
  trending.classList.add('inactive');
  topRated.classList.add('inactive');
  general.classList.remove('inactive');
  movieDetail.classList.add('inactive');
  SimilarMovies.classList.add('inactive');

  const [_, categoryData] = location.hash.split('='); //['category', 'id-name']
  // const urlPage = constanteAnterior[0];
  // const categoryData = constanteAnterior[1];
  const [categoryId, categoryName] = categoryData.split('-'); //['id', 'name']

  header_articule_Sleft_title_categoryView.innerHTML = categoryName;

  getMoviesByCategory(categoryId);
}

function movieDetailsPage() {
  console.log('muy bien, estamos en MOVIES');


  header.classList.add('header-container--long');
  // header.style.background = ('');
  header_arrow.classList.remove('inactive');
  header_articule_Sleft_title.classList.add('inactive');
  header_articule_sLeft_text.classList.add('inactive');
  header_articule_Sleft_title_categoryView.classList.add('inactive');
  header_articule_sRight_image.classList.add('inactive');

  search.classList.add('inactive');
  categories.classList.add('inactive');
  trending.classList.add('inactive');
  topRated.classList.add('inactive');
  general.classList.add('inactive');
  movieDetail.classList.remove('inactive');
  SimilarMovies.classList.remove('inactive');
}

function searchPage() {
  console.log('muy bien, estamos en SEARCH');

  header.classList.remove('header-container--long');
  // header.style.background = ('');
  header_arrow.classList.remove('inactive');
  header_articule_Sleft_title.classList.add('inactive');
  header_articule_sLeft_text.classList.add('inactive');
  header_articule_Sleft_title_categoryView.classList.remove('inactive');
  header_articule_sRight_image.classList.add('inactive');

  search.classList.remove('inactive');
  categories.classList.add('inactive');
  trending.classList.add('inactive');
  topRated.classList.add('inactive');
  general.classList.remove('inactive');
  movieDetail.classList.add('inactive');
  SimilarMovies.classList.add('inactive');

  const [_, query] = location.hash.split('='); //['search', 'data']
  // const urlPage = constanteAnterior[0];
  // const categoryData = constanteAnterior[1];

  getMoviesBySearch(query);
}

function TrendsPage() {
  console.log('muy bien, estamos en TRENDS');

  header.classList.remove('header-container--long');
  // header.style.background = ('');
  header_arrow.classList.remove('inactive');
  header_articule_Sleft_title.classList.add('inactive');
  header_articule_sLeft_text.classList.add('inactive');
  header_articule_Sleft_title_categoryView.classList.remove('inactive');
  header_articule_sRight_image.classList.add('inactive');

  search.classList.add('inactive');
  categories.classList.add('inactive');
  trending.classList.add('inactive');
  topRated.classList.add('inactive');
  general.classList.remove('inactive');
  movieDetail.classList.add('inactive');
  SimilarMovies.classList.add('inactive');
}

function topRatedPage() {
  console.log('muy bien, estamos en TRENDS');

  header.classList.remove('header-container--long');
  // header.style.background = ('');
  header_arrow.classList.remove('inactive');
  header_articule_Sleft_title.classList.add('inactive');
  header_articule_sLeft_text.classList.add('inactive');
  header_articule_Sleft_title_categoryView.classList.remove('inactive');
  header_articule_sRight_image.classList.add('inactive');

  search.classList.add('inactive');
  categories.classList.add('inactive');
  trending.classList.add('inactive');
  topRated.classList.add('inactive');
  general.classList.remove('inactive');
  movieDetail.classList.add('inactive');
  SimilarMovies.classList.add('inactive');
}

