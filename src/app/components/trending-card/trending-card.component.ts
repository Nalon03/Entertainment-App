import { NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Movie } from '../../interface/movie';

@Component({
  selector: 'app-trending-card',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './trending-card.component.html',
  styleUrl: './trending-card.component.css',
})
export class TrendingCardComponent {
  @Input()
  movies: Movie = {} as Movie;
  bgImage: any = {};
  isBookmarked: boolean = false;

  ngOnInit(): void {
    this.bgImage = {
      'background-image': `url(${this.movies.thumbnail.trending?.large})`,
    };
  }
}