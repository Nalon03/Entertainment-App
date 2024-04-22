import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter } from 'rxjs';
import { Movie } from '../interface/movie';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class TrendingMovies {
  constructor(private moviesService: DataService) {}

  trending$: Observable<Movie[]> | undefined;

  ngOnInit(): void {
    this.trending$ = this.moviesService.movies$.pipe(
      filter((movie) => movie.some((movie) => movie.isTrending))
    );
  }
}