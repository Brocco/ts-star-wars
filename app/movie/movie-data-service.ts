module app.movie {
  export interface IMovieDataService {
    getMovie: (id:number) => ng.IPromise<IMovie>;
    getMovies: ()=>ng.IPromise<IMovie[]>;
  }

  export interface IMovie {
    id: number;
    title: string;
    episodeId: number;
  }

  export class MovieDataService implements IMovieDataService {
    constructor(private $http:ng.IHttpService) {
    }

    getMovie(id) {
      //this.$http.get()
    }

    getMovies() {
      //this.$http.get()
    }
  }
}