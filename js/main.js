(function() {
    'use strict';

    const moviesDisplayArea = document.querySelector('.main-container');
    const searchBox = document.querySelector('.search-box');
    const searchButton = document.querySelector('.search-button');
    let movies = [];

    searchBox.addEventListener('keyup', e => {
        e.preventDefault();
        if (e.keyCode === 13) searchButton.click();
    });

    searchButton.addEventListener('click', e => {
        location.reload();
    });

    function search(arr, searchTerm) {
        for (let i = 0; i < arr.length; i++){
        if (!(arr[i].movie_title.toLowerCase().includes(searchTerm.toLowerCase()))){
                arr[i] = '';
            }
        }
        return arr;
    }

    (function getData(){

        let movieCode = '';

        fetch('http://starlord.hackerearth.com/movieslisting')
        .then(response => {

            if (!response.ok) {
                alert(`Can't fetch data from server!`);
                console.log(`Problem getting data. STAUS CODE: ${response.status}`);
            }

            response.json().then(movieList => {
                movieList.forEach(entry => {
                    movies.push(entry);
                });

                let searchQuery = searchBox.value;
                movies = search(movies, searchQuery);

                movies.forEach(movie => {
                    if (!movie) return;

                    movieCode += `<div class="movie">
                                    <div class="movie-title">${movie.movie_title}</div>
                                        Content Rating: <span class="movie-rating">${movie.content_rating}</span>
                                    <div class="movie-info-card info-first">
                                        <i class="fa fa-language"></i> <span class="movie-language">${movie.language}</span><br>
                                        <i class="fa fa-calendar"></i> <span class="movie-year">${movie.title_year}</span><br>
                                        <i class="fa fa-film"></i> <span class="movie-genres">${movie.genres}</span>
                                    </div>
                                    <div class="movie-info-card info-second">
                                        Director: <span class="movie-director">${movie.director_name}</span> <br>
                                        Casts:<br>
                                        <ul>
                                            <li class="movie-cast">${movie.actor_1_name}</li>
                                            <li class="movie-cast">${movie.actor_2_name}</li>
                                        </ul>
                                    </div>
                                    <a href="${movie.movie_imdb_link}">See on IMDb</a>
                                </div>`;
                });
                moviesDisplayArea.innerHTML = movieCode;
            });
        })
        .catch(error => {
            alert("Error getting Movies data!");
            console.log(error);
        });
    })();

})();