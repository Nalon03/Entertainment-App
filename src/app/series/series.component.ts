import { Component, NgModule, OnInit } from '@angular/core';
import { NavBarComponent } from '../../app/components/nav-bar/nav-bar.component';
import { FormsModule, NgModel } from '@angular/forms';
import { Movie } from '../../app/interface/movie';
import { DataService } from '../../app/services/data.service';
import { MovieCardComponent } from '../../app/components/movie-card/movie-card.component';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [NavBarComponent, FormsModule, MovieCardComponent],
  templateUrl: './series.component.html',
  styleUrl: './series.component.css',
})
export class SeriesComponent implements OnInit {
  searchData: string = '';
  movies: Movie[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getSeries().subscribe((movie) => {
      this.movies = movie;
    });
  }

  search(value: Event) {
    const searchValue: any = (value.target as HTMLInputElement).value;
    this.searchData = searchValue;
  }

  filterMovies(): Movie[] {
    if (!this.searchData) {
      return this.movies;
    }
    return this.movies.filter((movie) =>
      movie.title.toLowerCase().includes(this.searchData.toLowerCase().trim())
    );
  }
}
