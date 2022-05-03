import FilmsSectionView from '../view/films-section-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsContainerView from '../view/films-container.js';
import MovieCardView from '../view/movie-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmsTopRatedView from '../view/films-top-rated-view.js';
import FilmsMostCommentedView from '../view/films-most-commented-view.js';
import { render } from '../render.js';

export default class FilmsPresenter {
  filmsSectionComponent = new FilmsSectionView();
  filmsListComponent = new FilmsListView();
  filmsContainerComponent = new FilmsContainerView();

  init = (filmsContainer, mockMoviesModel) => {
    this.filmsContainer = filmsContainer;
    this.mockMoviesModel = mockMoviesModel;
    this.movies = [...this.mockMoviesModel.getMockMoviesData()];
    this.comments = [...this.mockMoviesModel.getMockComments()];

    render(this.filmsSectionComponent, this.filmsContainer);
    render(this.filmsListComponent, this.filmsSectionComponent.getElement());
    render(this.filmsContainerComponent, this.filmsListComponent.getElement());

    for (let i = 0; i < this.movies.length; i++) {
      //const movieComments = getCommentsByIds(this.comments, this.movies[i].comments)
      //console.log(this.movies[i].comments);
      //импортировать созданную в утилитах функцию, которая будет собирать массив с комментариями по ID комментариев из данного фильма
      //функция примет массив id из фильма и все комментарии и вернет массив с комментариями
      render(new MovieCardView(
        this.movies[i],
        //movieComments здесь должна быть переменная с отобранными комментариями для фильма
      ), this.filmsContainerComponent.getElement());
    }

    render(new ShowMoreButtonView(), this.filmsListComponent.getElement());
    render(new FilmsTopRatedView(), this.filmsSectionComponent.getElement());
    render(new FilmsMostCommentedView(), this.filmsSectionComponent.getElement());
  };
}