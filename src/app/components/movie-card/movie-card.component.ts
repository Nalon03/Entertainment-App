import { NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Movie } from '../../interface/movie';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {
  @Input()
  movies: Movie = {} as Movie;
  bgImage: any = {};
  isBookmarked: boolean = false;

  ngOnInit(): void {
    this.bgImage = {
      'background-image': `url(${this.movies.thumbnail.regular?.large})`,
    };
  }
}