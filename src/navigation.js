let maxPage;
let page = 1;

let infiniteScroll;

header_arrow_button_reload.addEventListener('click', () => {
  location.reload();
})

iconSearch.addEventListener('click', () => {
  location.hash = `search=${inputsearch.value}`;
})

trending_btn.addEventListener('click', () => {
  location.hash = 'trends'
})

header_arrow_button_back.addEventListener('click', () => {
  location.hash = history.back();
})

topRated_btn.addEventListener('click', () => {
  location.hash = 'topRated'
})

languageOptions.addEventListener("click", () => {
  lang = languageOptions.value;
  console.log(lang)
  homePage();
  // getLanguages();
});

window.addEventListener('DOMContentLoaded', navigation, false);

window.addEventListener('hashchange', navigation, false);
// la función que queremos ejecutar cada vez que cambie el hash

window.addEventListener('scroll', infiniteScroll, false);
// nombre de la función que se debe ejecutar cuando hacemos scroll y el nombre de la función lo hacemos dinámico
// creando una variable que se llama infiniteScroll y le estamos dando ese valor en cada distinta función que se ejecute en la ruta que estemos

// este evento de scroll pone los parentesis del atajo 

function navigation() {
  // console.log({ location });
  if (infiniteScroll) {
    window.removeEventListener('scroll', infiniteScroll, {passive: false});
    infiniteScroll = undefined;
  }

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
    getLanguages();
  }
  // location.hash
  // aquí leemos el hash para que dependiendo del resultado que nos dé, mostrar una sección u otra

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  if (infiniteScroll) {
    window.addEventListener('scroll', infiniteScroll, {passive: false});
  }
}
// esta función la vamos a llamar cuando cargue la app y cada vez que cambie el hash

function homePage() {
  // console.log('algo salió mal, estás en el Home');
  header.classList.remove('header-container--long');
  header.style.background = ('');
  header_arrow.classList.add('inactive');
  header_articule_Sleft_title.classList.remove('inactive');
  header_articule_Sleft_title.classList.remove('inactive');
  header_articule_sCenter.classList.remove('inactive');
  header_articule_sRight.classList.remove('inactive');
  header_articule_Sleft_title_categoryView.classList.add('inactive');

  search.classList.remove('inactive');
  categories.classList.remove('inactive');
  trending.classList.remove('inactive');
  topRated.classList.remove('inactive');
  general.classList.add('inactive');
  movieDetail.classList.add('inactive');
  similarMovies.classList.add('inactive');
  favorited.classList.remove('inactive');

  categories_content_loading.classList.remove('inactive');
  movie_container_loading.classList.remove('inactive');
  trendingContainer_movie_div_loading.classList.add('inactive');
  similar_movieContent_loading.classList.add('inactive');
  header_articule_sLeft_text.classList.remove('inactive');
  header_articule_sRight_image.classList.remove('inactive');

  getTrendingMoviesPreview();
  getCategoriesMoviesPreview();
  getTopRatedPreview();
  getLikedMovies();
  // getLanguages();
}

function categoriesPage() {
  // console.log('muy bien, estamos en CATEGORIES');

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
  similarMovies.classList.add('inactive');
  favorited.classList.add('inactive');

  const [_, categoryData] = location.hash.split('='); //['category', 'id-name']
  // const urlPage = constanteAnterior[0];
  // const categoryData = constanteAnterior[1];
  const [categoryId, categoryName] = categoryData.split('-'); //['id', 'name']

  header_articule_Sleft_title_categoryView.innerHTML = categoryName;
  getMoviesByCategory(categoryId);

  infiniteScroll = getPaginatedMoviesByCategory(categoryId);
}

function movieDetailsPage() {
  // console.log('muy bien, estamos en MOVIES');

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
  similarMovies.classList.remove('inactive');
  favorited.classList.add('inactive');

  const [_, movieId] = location.hash.split('='); //['movie', 'id']
  // const urlPage = constanteAnterior[0];
  // const categoryData = constanteAnterior[1];

  getMovieById(movieId);
}

function searchPage() {
  // console.log('muy bien, estamos en SEARCH');

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
  similarMovies.classList.add('inactive');
  favorited.classList.add('inactive');

  const [_, query] = location.hash.split('='); //['search', 'data']
  // const urlPage = constanteAnterior[0];
  // const categoryData = constanteAnterior[1];

  getMoviesBySearch(query);

  infiniteScroll = getPaginatedMoviesBySearch(query);
  // cuando aquí le asignemos el nombre de la función que debe ejecutar, pero el "return" de la
  // función no se está ejecutando por tanto tendríamos que enviar otros parentesis ()
}

function TrendsPage() {
  // console.log('muy bien, estamos en TRENDS');

  header.classList.remove('header-container--long');
  // header.style.background = ('');
  header_arrow.classList.remove('inactive');
  header_articule_Sleft_title.classList.remove('inactive');
  header_articule_sLeft_text.classList.add('inactive');
  header_articule_Sleft_title_categoryView.classList.remove('inactive');
  header_articule_sRight_image.classList.add('inactive');

  search.classList.add('inactive');
  categories.classList.add('inactive');
  trending.classList.add('inactive');
  topRated.classList.add('inactive');
  general.classList.remove('inactive');
  movieDetail.classList.add('inactive');
  similarMovies.classList.add('inactive');
  favorited.classList.add('inactive');

  header_articule_Sleft_title_categoryView.innerHTML = "tendencias";

  getTrendingMovies();

  infiniteScroll = getPaginatedTrendingMovies;
  // ATAJO
}

function topRatedPage() {
  // console.log('muy bien, estamos en TRENDS');

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
  similarMovies.classList.add('inactive');
  favorited.classList.add('inactive');

  getTopRatedMovies();

  infiniteScroll = getPaginatedTopRatedMovies;
  // ATAJO
}

