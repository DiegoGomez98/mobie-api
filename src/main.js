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

// HELPERS

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

function createMovies(movies, container) {
  container.innerHTML = '';

  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute('src',
    'https://image.tmdb.org/t/p/w300' + movie.poster_path);
    
    movieContainer.appendChild(movieImg);
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
  movieContent.innerHTML = "";
  const movies = data.results;
  
  createMovies(movies, movieContent);
}

async function getCategoriesMoviesPreview() {
  // const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);
  const { data } = await api('/genre/movie/list');
  // destructurado para sacar data ya parseado, por eso no llamamos a res.json
  
  // aquí ya no llamamos a fetch sino a api y obviamos el principio del primer parametro porque ya lo establecimos
  // así que enviaremos la parte del endpoint. De la misma manera no se envia key puesto que ya hace parte de los parametros
  
  // const data = await res.json();
  // no tenemos que hacer res.json para convertir esto a objetos de javascript, puesto que axios ya nos devuelve eso automaticamente
  
  const categoriesData = data.genres;
  categories_sections.innerHTML = "";
  console.log(categoriesData);
  
  createCategories(categoriesData, categories_sections);
}

async function getTopRatedPreview() {
  const { data } = await api('movie/top_rated');

  const movies = data.results;
  console.log(movies);
  movies.forEach(movie => {
    const topRated = document.querySelector('#topRated .movieContent');

    const movie_container = document.createElement('div');
    movie_container.classList.add('movie-container');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute('src',
    'https://image.tmdb.org/t/p/w300' + movie.poster_path);
    
    movie_container.appendChild(movieImg);
    topRated.appendChild(movie_container);
  });
}

async function getMoviesByCategory(id) {
  const { data } = await api('/discover/movie', {
    params: {
      with_genres: id
    }
  });
  const movies = data.results;
  createMovies(movies, general);
}

async function getMoviesBySearch(query) {
  const { data } = await api('/search/movie', {
    params: {
      query,
    },
  });
  const movies = data.results;
  
  createMovies(movies, general);
}


// async function getsimilarMoviesPreview() {
//   const { data } = await api('/trending/movie/day');

//   const movies = data.results;
//   movies.forEach(movie => {
//     const trending = document.querySelector('#trending .movieContent');

//     const movieContainer = document.createElement('div');
//     movieContainer.classList.add('movie-container');

//     const movieImg = document.createElement('img');
//     movieImg.classList.add('movie-img');
//     movieImg.setAttribute('alt', movie.title);
//     movieImg.setAttribute('src',
//     'https://image.tmdb.org/t/p/w300' + movie.poster_path);
    
//     movieContainer.appendChild(movieImg);
//     trending.appendChild(movieContainer);
//   });
// }