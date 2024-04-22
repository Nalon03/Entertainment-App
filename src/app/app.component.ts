import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Movie } from './interface/movie';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'entertainment-app';

  movie: Movie[] = [];
  trending: Movie[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.movies$.subscribe({
      next: (data) => ((this.movie = data), console.log(this.movie)),
      error: (err) => console.error(err),
      complete: () => console.log('All Movies fetched'),
    });

    this.dataService.getTrendingMovies().subscribe((movies) => {
      this.trending = movies;
      console.log(this.trending);
    });

  }
}