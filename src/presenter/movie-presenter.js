import MovieCardView from '../view/movie-card-view.js';
import MovieDetailsView from '../view/movie-details-view.js';
import { isEscapeKey } from '../utils/utils.js';
import { render, remove, RenderPosition, replace } from '../framework/render.js';

const siteFooterElement = document.querySelector('.footer');
const Mode = {
  DEFAULT: 'DEFAULT',
  DETAILS: 'DETAILS',
};

export default class MoviePresenter {
  #movieContainer = null;
  #changeMovie = null;
  #changeMode = null;
  #movieCardComponent = null;
  #movieDetailsComponent = null;
  #movie = null;
  #comments = null;
  #mode = Mode.DEFAULT;

  constructor(movieContainer, changeMovie, changeMode) {
    this.#movieContainer = movieContainer;
    this.#changeMovie = changeMovie;
    this.#changeMode = changeMode;
  }

  init = (movie, comments) => {
    this.#movie = movie;
    this.#comments = comments;
    const prevMovieCardComponent = this.#movieCardComponent;
    const prevMovieDetailsComponent = this.#movieDetailsComponent;

    this.#movieCardComponent = new MovieCardView(this.#movie, this.#comments);
    this.#movieDetailsComponent = new MovieDetailsView(this.#movie, this.#comments);

    this.#movieCardComponent.setDetailsClickHandler(this.#onMovieCardClick);
    this.#movieCardComponent.setWatchlistClickHandler(this.#onWatchlistClick);
    this.#movieCardComponent.setAlreadyWatchedClickHandler(this.#onAlreadyWatchedClick);
    this.#movieCardComponent.setFavoriteClickHandler(this.#onFavoriteClick);

    this.#movieDetailsComponent.setCloseDetailsClickHandler(this.#onCloseDetailsView);
    this.#movieDetailsComponent.setWatchlistClickHandler(this.#onWatchlistClick);
    this.#movieDetailsComponent.setAlreadyWatchedClickHandler(this.#onAlreadyWatchedClick);
    this.#movieDetailsComponent.setFavoriteClickHandler(this.#onFavoriteClick);

    if (prevMovieCardComponent === null || prevMovieDetailsComponent === null) {
      render(this.#movieCardComponent, this.#movieContainer);
      return;
    }

    replace(this.#movieCardComponent, prevMovieCardComponent);
    replace(this.#movieDetailsComponent, prevMovieDetailsComponent);

    remove(prevMovieCardComponent);
    remove(prevMovieDetailsComponent);
  };

  destroy = () => {
    remove(this.#movieCardComponent);
    remove(this.#movieDetailsComponent);
  };

  resetView = () => {
    if (this.#mode === Mode.DETAILS) {
      this.#onCloseDetailsView();
    }
  };

  #onCloseDetailsView = () => {
    remove(this.#movieDetailsComponent);
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onEscapeKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #onEscapeKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#onCloseDetailsView(this.#movie, this.#comments);
    }
  };

  #renderMovieDetails = () => {
    render(this.#movieDetailsComponent, siteFooterElement, RenderPosition.AFTEREND);
    this.#movieDetailsComponent.setCloseDetailsClickHandler(this.#onCloseDetailsView);
    this.#movieDetailsComponent.setWatchlistClickHandler(this.#onWatchlistClick);
    this.#movieDetailsComponent.setAlreadyWatchedClickHandler(this.#onAlreadyWatchedClick);
    this.#movieDetailsComponent.setFavoriteClickHandler(this.#onFavoriteClick);
  };

  #onMovieCardClick = () => {
    this.#changeMode();
    this.#renderMovieDetails();
    this.#mode = Mode.DETAILS;

    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onEscapeKeyDown);
  };

  #onWatchlistClick = () => {
    this.#movie.userDetails.watchlist = !this.#movie.userDetails.watchlist;
    this.#changeMovie({ ...this.#movie }, [...this.#comments]);
  };

  #onAlreadyWatchedClick = () => {
    this.#movie.userDetails.alreadyWatched = !this.#movie.userDetails.alreadyWatched;
    this.#changeMovie({ ...this.#movie }, [...this.#comments]);
  };

  #onFavoriteClick = () => {
    this.#movie.userDetails.favorite = !this.#movie.userDetails.favorite;
    this.#changeMovie({ ...this.#movie }, [...this.#comments]);
  };
}
