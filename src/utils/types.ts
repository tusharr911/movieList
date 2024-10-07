export interface MovieState {
  watchListArray: string[];
  length: number;
}

export interface AddMovieAction {
  type: string;
  payload: string;
}

export interface RemoveMovieAction {
  type: string;
  payload: string;
}

export interface InitiateWatchListAction {
  type: string;
}

export interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
}
