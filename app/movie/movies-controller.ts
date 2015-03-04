module app.movie {
  export class MoviesController {
    static $inject = ['movieData'];
    constructor(movieData:IMovieDataService) {
      movieData.getMovies()
          .then((movies) => {
            this.movies = movies;
          });
    }

    movies:IMovie[];
  }
}