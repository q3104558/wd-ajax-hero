(function () {
  const movies = [];

  const renderMovies = function () {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({
        delay: 50
      }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE

  const toMovie = function (movie) {
    let result = {}
    result.title = movie.Title
    result.id = movie.imdbID
    result.year = movie.Year
    result.poster = movie.Poster
    return result
  }

  const getMovieInfo = function (xhttp) {
    movies.length = 0
    allMovies = JSON.parse(xhttp.responseText).Search
    // console.log(allMovies)
    for (let i = 0; i < allMovies.length; i++) {
      movies.push(toMovie(allMovies[i]))
    }
    renderMovies()
  }

  function loadDoc(searchTerm, cFunction) {
    let xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        cFunction(this);
      }
    };
    xhttp.open('GET', `https://omdb-api.now.sh/?s=${searchTerm}`, true);
    xhttp.send();
  }

  const submitted = function (event) {
    event.preventDefault()
    let searchVal = $('#search').val().replace(' ', '%20')
    loadDoc(searchVal, getMovieInfo);
    renderMovies()
  }

  $(':submit').click(function (event) {
    event.preventDefault()
    let searchVal = $('#search').val().replace(' ', '%20')
    loadDoc(searchVal, getMovieInfo);
    renderMovies()
  })
}());
