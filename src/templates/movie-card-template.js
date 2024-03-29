import { humanizeYearDate, getTimeFromMins } from '../utils/utils.js';

export const createMovieCardTemplate = (state) => {
  const MAX_DESCRIPTION_LENGTH = 140;
  const {
    comments,
    filmInfo: {
      title,
      totalRating,
      description,
      poster,
      release: { date },
      runtime,
      genre,
    },
    userDetails: {
      watchlist,
      alreadyWatched,
      favorite,
    },
    isDisabled
  } = state;

  const isWatchlistActive = watchlist ? 'film-card__controls-item--active' : '';
  const isAlreadyWatchedActive = alreadyWatched ? 'film-card__controls-item--active' : '';
  const isFavoriteActive = favorite ? 'film-card__controls-item--active' : '';

  const getHumanizeYearDate = (yearDate) => {
    if (yearDate) {
      return humanizeYearDate(yearDate);
    }
    return '';
  };

  const getTimeInHoursAndMins = (timeInMinutes) => getTimeFromMins(timeInMinutes);

  const takeDescription = (descriptionText) => {
    if (!descriptionText) {
      return '';
    }
    else if (descriptionText.length > MAX_DESCRIPTION_LENGTH) {
      return `${descriptionText.substring(0, MAX_DESCRIPTION_LENGTH - 1)}...`;
    }
    return descriptionText;
  };

  return (
    `<article class="film-card" id=${state.id}>
        <a class="film-card__link">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating"><br>${totalRating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${getHumanizeYearDate(date)}</span>
            <span class="film-card__duration">${getTimeInHoursAndMins(runtime)}</span>
            <span class="film-card__genre">${genre[0] || ''}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${takeDescription(description)}</p>
          <span class="film-card__comments">${comments.length} comments</span>
        </a>
        <div class="film-card__controls">
          <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${isWatchlistActive}" type="button"${isDisabled ? ' disabled' : ''}>Add to watchlist</button>
          <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${isAlreadyWatchedActive}" type="button"${isDisabled ? ' disabled' : ''}>Mark as watched</button>
          <button class="film-card__controls-item film-card__controls-item--favorite ${isFavoriteActive}" type="button"${isDisabled ? ' disabled' : ''}>Mark as favorite</button>
        </div>
    </article>`
  );
};
