let lang = "en";
// let lang = navigator.language;

// DATA
// INSTANCIA DE AXIOS
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  header: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  }
  // de esta forma tenemos los parametros listos para enviarlo a todas las consultas para no tener que concatenar siempre lo mismo (código más corto)
});
// lo que hacemos es crear la configuración por defecto con la que podamos trabajar en el resto de nuestras consultas

// ARRAY DE IDIOMAS
const countries = [
  {
    name: "usa",
    language: "en",
    flag: 'inglish',
  },

  {
    name: "español",
    language: "es",
    flag: 'españolo',
  },
]

// DATAHELPERS
function likedMovieList() {
  const item = JSON.parse(localStorage.getItem('liked_movies'));
  // estamos parsenado, es decir, combirtiendo a obj lo que sea que venga de LocalStorage, que probablemente sea un string
  let movies;
  
   if (item) {
    movies = item;
   } else {
    movies = {}
   }
   
  return movies;
}

function likeMovie(movie) {
  // movie.id
  const likedMovies = likedMovieList();

  // console.log(likedMovies);

  if (likedMovies[movie.id]) {
    likedMovies[movie.id] = undefined;
  } else {
    likedMovies[movie.id] = movie;
  }

  localStorage.setItem('liked_movies', JSON.stringify(likedMovies));
  getTrendingMoviesPreview()
  getLikedMovies()
}

// HELPERS

// let options = {
//   root: null,
//   // root: TopRated_movieContent,
//   // root: similar_movieContent,
//   // root:  general,
//   rootMargin: '0px',
//   threshold: 1
// }

const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // console.log(entry.target.setAttribute)
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute('data-img');
      entry.target.setAttribute('src', url)
    }
  });
});
// aquí estamos recibiendo cada imagen a este array);

function emoji(param) {
  if (param == 28) {
  return '🦹‍♂️'
  } else if (param == 12) {
  return '🤯'
  } else if (param == 16) {
  return '🤹'
  } else if (param == 35) {
  return '🤣'
  } else if (param == 80) {
  return '🔪'
  } else if (param == 99) {
  return '🎬'
  } else if (param == 18) {
  return '🤩'
  } else if (param == 10751) {
  return '👪'
  } else if (param == 14) {
  return '👽'
  } else if (param == 36) {
  return '👀'
  } else if (param == 27) {
  return '👹'
  } else if (param == 10402) {
  return '🎧'
  } else if (param == 9648) {
  return '❓'
  } else if (param == 10749) {
  return '🥰'
  } else if (param == 878) {
  return '🤖'
  } else if (param == 10770) {
  return '💤'
  } else if (param == 53) {
  return '☠'
  } else if (param == 10752) {
  return '🔫'
  } else if (param == 37) {
  return '🤠'
  }
}

function createMovies(movies, container,
  {
    lazyLoad = false, 
    clean = true,
  } = {},
  // ={} en caso de que no enviemos nada o una sola propiedad
)
  {
  if (clean) {
    container.innerHTML = '';
  }

  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute(
      lazyLoad ? 'data-img' : 'src',
      // si lazyLoad es true se agrega a data-img si no, a src
      'https://image.tmdb.org/t/p/w300' + movie.poster_path);

    movieImg.addEventListener('click', () => {
      location.hash = `#movie=${movie.id}`
    });
    movieImg.addEventListener('error', () => {
      movieImg.setAttribute(
        'src',
        'https://cdn.pixabay.com/photo/2012/04/28/19/59/park-44310_960_720.png')
    });

    const movieBtn = document.createElement('button');
    movieBtn.classList.add('movie-btn');
    likedMovieList()[movie.id] && movieBtn.classList.add('movie-btn--favorited');
    // si mi película está en el LS agrega la clase
    movieBtn.addEventListener('click', () => {
      movieBtn.classList.toggle('movie-btn--favorited');
      // toggle nos permite quitar o poner la clase si la tiene o no, dependiendo
      likeMovie(movie)
    });

    if (lazyLoad) {
      lazyLoader.observe(movieImg);
    }
      // cuando hagamos OBSERVE estamos agregando cada una de las img a nuestro
      // array de entrys
    
    movieContainer.appendChild(movieImg);
    movieContainer.appendChild(movieBtn);
    container.appendChild(movieContainer);
  });
}

function createCategories(categories, container) {
  container.innerHTML = '';

  categories.forEach(category => {
    const categoriesContent = document.createElement('div');
    categoriesContent.classList.add('categories-content');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('categories_content-h3');
    categoryTitle.setAttribute('id', category.id);
    const categoryTitleText = document.createTextNode(category.name);
    categoryTitle.addEventListener('click', () => {
      location.hash = `category=${(category.id)}-${(category.name)}`;
    });

    const categoryEmoji = document.createElement('h2');
    categoryEmoji.classList.add('categories-content-h2');
    categoryEmoji.setAttribute('id', category.id);
    const categoryEmojiText = document.createTextNode(emoji(category.id));

    categoryEmoji.appendChild(categoryEmojiText);
    categoryTitle.appendChild(categoryTitleText);
    categoriesContent.appendChild(categoryEmoji);
    categoriesContent.appendChild(categoryTitle);
    container.appendChild(categoriesContent);
  });
}

// LLAMADOS A LA API

async function getTrendingMoviesPreview() {
  const { data } = await api('/trending/movie/day');
  const movies = data.results;
  maxPage = data.total_pages;
  
  createMovies(movies, movieContent, { lazyLoad: true, clean: true });
}

async function getCategoriesMoviesPreview() {
  // const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);
  const { data } = await api('/genre/movie/list', {
      language: lang,
    },);
  // destructurado para sacar data ya parseado, por eso no llamamos a res.json
  
  // aquí ya no llamamos a fetch sino a api y obviamos el principio del primer parametro porque ya lo establecimos
  // así que enviaremos la parte del endpoint. De la misma manera no se envia key puesto que ya hace parte de los parametros
  
  // const data = await res.json();
  // no tenemos que hacer res.json para convertir esto a objetos de javascript, puesto que axios ya nos devuelve eso automaticamente
  
  const categoriesData = data.genres;
  categories_sections.innerHTML = "";
  // console.log(categoriesData);
  
  createCategories(categoriesData, categories_sections);
}

async function getTopRatedPreview() {
  const { data } = await api('movie/top_rated');
  const movies = data.results;

  createMovies(movies, TopRated_movieContent, { lazyLoad: true, clean: true });
}

async function getMoviesByCategory(id) {
  const { data } = await api('/discover/movie', {
    params: {
      with_genres: id
    }
  });
  const movies = data.results;
  maxPage = data.total_pages;

  createMovies(movies, general, { lazyLoad: true, clean: true });
}

async function getPaginatedMoviesByCategory(id) {
  return async function () {
    const { 
    scrollTop,
    scrollHeight, 
    clientHeight 
  } = document.documentElement;  

  const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
  const pageIsNotMax = page < maxPage;

  if (scrollIsBottom && pageIsNotMax) {
    page++;
    const { data } = await api('/discover/movie', {
    params: {
      with_genres: id,
      page,
    },
  });
  const movies = data.results;

  createMovies(movies, general, { lazyLoad: true, clean: page == 1 });
  }
  }
}

async function getMoviesBySearch(query) {
  const { data } = await api('/search/movie', {
    params: {
      query,
    },
  });
  const movies = data.results;
  maxPage = data.total_pages;
  // console.log(maxPage);

  createMovies(movies, general);
}

// CLOSURES
async function getPaginatedMoviesBySearch(query) {
  return async function () {
    const { 
    scrollTop,
    scrollHeight, 
    clientHeight 
  } = document.documentElement;  

  const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
  const pageIsNotMax = page < maxPage;

  if (scrollIsBottom && pageIsNotMax) {
    page++;
    const { data } = await api('/search/movie', {
    params: {
      query,
      page,
    },
  });
  const movies = data.results;

  createMovies(movies, general, { lazyLoad: true, clean: page == 1 });
  }
  }
}

async function getTrendingMovies() {
  const { data } = await api('/trending/movie/day');
  movieContent.innerHTML = "";
  const movies = data.results;
  
  createMovies(movies, general);

  // const btnLoadMore = document.createElement('button');
  // btnLoadMore.innerText = 'cargar más';
  // btnLoadMore.addEventListener('click', () => {
  //   getPaginatedTrendingMovies();
  //   btnLoadMore.style.display = 'none';
  // });
  // general.appendChild(btnLoadMore);
}

async function getPaginatedTrendingMovies() {
  const { 
    scrollTop,
    scrollHeight, 
    clientHeight 
  } = document.documentElement;  

  const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
  const pageIsNotMax = page < maxPage;

  if (scrollIsBottom && pageIsNotMax) {
    page++;
    const { data } = await api('/trending/movie/day', {
    params: {
      page
      },
    });
    const movies = data.results;

    createMovies(movies, general, { lazyLoad: true, clean: page == 1 });
  }
};
  
// BOTON DE LOAD MORE

  // const btnLoadMore = document.createElement('button');
  // btnLoadMore.innerText = 'cargar más';
  // btnLoadMore.addEventListener('click', () => {
  //   getPaginatedTrendingMovies(page + 1);
  //   btnLoadMore.style.display = 'none';
  // });
  // general.appendChild(btnLoadMore);

async function getTopRatedMovies() {
  const { data } = await api('/movie/top_rated');
  movieContent.innerHTML = "";
  const movies = data.results;
  
  createMovies(movies, general);

  // const btnLoadMore = document.createElement('button');
  // btnLoadMore.innerText = 'cargar más';
  // btnLoadMore.addEventListener('click', () => {
  //   getPaginatedTrendingMovies();
  //   btnLoadMore.style.display = 'none';
  // });
  // general.appendChild(btnLoadMore);
}

async function getPaginatedTopRatedMovies() {
  const { 
    scrollTop,
    scrollHeight, 
    clientHeight 
  } = document.documentElement;  

  const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
  const pageIsNotMax = page < maxPage;

  if (scrollIsBottom && pageIsNotMax) {
    page++;
    const { data } = await api('/movie/top_rated', {
    params: {
      page
      },
    });
    const movies = data.results;

    createMovies(movies, general, { lazyLoad: true, clean: page == 1 });
  }
};


async function getMovieById(id) {
  const { data: movie } = await api(`/movie/${id}`, {language: lang});
  // recibimos un objeto data y lo renombramos como movie
 
  const movieImgURL = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
  // console.log(movieImgURL);
  header.style.background = `url(${movieImgURL})`
  header.style.backgroundRepeat = 'no-repeat';
  header.style.backgroundAttachment = 'fixed';
  header.style.backgroundPosition = 'center';
  header.style.backgroundSize = 'cover';

  categories_titles_detail_title.textContent = movie.title;
  categories_titles_detail_span.textContent = movie.vote_average;
  categories_titles_detail_description.textContent = movie.overview;

  createCategories(movie.genres, movieDetail_categories);

  getRelatedMoviesById(id);
}

async function getRelatedMoviesById(id) {
  const { data} = await api(`/movie/${id}/similar`);
  const relatedMovies = data.results;

  createMovies(relatedMovies, similar_movieContent);
}

// document.documentElement.scrollTop
// cuanto scroll hemos hecho

// document.documentElement.clientHeight
// alto de la pantalla de nuestro usuario

// document.documentElement.scrollHeight
// cuanto scroll podemos hacer en la pantalla

function getLikedMovies() {
  const likedMovies = likedMovieList();

  const moviesArray = Object.values(likedMovies)
  // .values nos ayuda a crear un array con todos los valores de un obj
  // {keys: 'value', keys: 'value'}
  // [value, value]
  
  createMovies(moviesArray, favoritedContent, { lazyLoad: true, clean: true})

  // console.log(moviesArray);
}

// LANGUAGES

async function getLanguages() {
  languageOptions.innerHTML = '';
  countries.forEach((country) => {
    const languageOption = document.createElement('option');
    languageOption.setAttribute('value', country.language );
    languageOption.setAttribute('for', 'language');
    const languageText = document.createTextNode(country.flag);
    languageOption.appendChild(languageText);
    languageOptions.appendChild(languageOption);
  });
};

// languageOptions.addEventListener("change", (event) => {
//   lang = event.target.value;
//   homePage();
// });
