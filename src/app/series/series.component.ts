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
  searchData: string = 'hello';
  movie: Movie[] = [];

  constructor(private movies: DataService) {}

  ngOnInit(): void {
    this.movies.getSeries().subscribe((movie) => {
      this.movie = movie;
    });
  }

  search():void {
    console.log(this.searchData);
  }
}