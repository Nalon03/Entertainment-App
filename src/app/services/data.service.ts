import { Injectable } from '@angular/core';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable, filter } from 'rxjs';
import data from '../../data.json';
import { Movie } from '../interface/movie';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  filter(arg0: (movie: DataService) => any): Movie[] {
    throw new Error('Method not implemented.');
  }
  private _movies = new BehaviorSubject<Movie[]>(data);
  public movies$: Observable<Movie[]> = this._movies.asObservable();
  title: any;

  updateValue(newValue: Movie[]) {
    this._movies.next(newValue);
  }

  getTrendingMovies(): Observable<Movie[]> {
    return this.movies$.pipe(
      map((movies) => movies.filter((movie) => movie.isTrending))
    );
  }

  getRemainingMovies(): Observable<Movie[]> {
    return this.movies$.pipe(
      map((movies) => movies.filter((movie) => !movie.isTrending))
    );
  }

  getMovies(): Observable<Movie[]> {
    return this.movies$.pipe(
      map((movies) => movies.filter((movie) => movie.category == "Movie"))
    );
  }

  getSeries(): Observable<Movie[]> {
    return this.movies$.pipe(
      map((movies) => movies.filter((movie) => movie.category == "TV Series"))
    );
  }

  getBookmarks(): Observable<Movie[]> {
    return this.movies$.pipe(
      map((movies) => movies.filter((movie) => movie.isBookmarked))
    );
  }

  
}