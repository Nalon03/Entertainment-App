import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../app/components/nav-bar/nav-bar.component';
import {
  FormControl,
  FormControlDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Movie } from '../../app/interface/movie';
import { DataService } from '../../app/services/data.service';
import { MovieCardComponent } from '../../app/components/movie-card/movie-card.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    NavBarComponent,
    FormsModule,
    MovieCardComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  // searchData: FormControl = new FormControl();
  searchData: string = '';

  movies: Movie[] = [];
  filteredMovie: Movie[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getMovies().subscribe((movie) => {
      this.movies = movie;
    });

  }

  search(value: Event) {
    const searchValue: any = (value.target as HTMLInputElement).value;
    this.searchData = searchValue;
  }

  filterMovies(): Movie[] {
    
    if(!this.searchData){
       return this.movies;
    }
    return this.movies.filter((movie) =>
    movie.title.toLowerCase().includes(this.searchData.toLowerCase().trim())
  )
  }
}