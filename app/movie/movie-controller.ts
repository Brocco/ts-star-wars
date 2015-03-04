module app.movie {
  export class MovieController implements IMovie {
    static $inject = ['$routeParams', 'movieData'];
    constructor($routeParams:ng.IRouteParamsService,
                movieData:IMovieDataService) {
      movieData.getMovie(<number>$routeParams['id'])
          .then((movie) => {
            this.id = movie.id;
            this.title = movie.title;
            this.episodeId = movie.episodeId;
          });

    }

    id: number;
    title: string;
    episodeId: number;
  }
}