import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../app/components/nav-bar/nav-bar.component';
import { FormsModule } from '@angular/forms';
import { TrendingCardComponent } from '../../app/components/trending-card/trending-card.component';
import { Movie } from '../../app/interface/movie';
import { DataService } from '../../app/services/data.service';
import { MovieCardComponent } from '../../app/components/movie-card/movie-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavBarComponent,
    FormsModule,
    TrendingCardComponent,
    MovieCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  searchData: string = '';
  trendingMovie: Movie[] = [];
  movie: Movie[] = [];

  constructor(private movies: DataService) {}

  ngOnInit(): void {
    this.movies.getTrendingMovies().subscribe((movie) => {
      this.trendingMovie = movie;
    });

    this.movies.getRemainingMovies().subscribe((movie) => {
      this.movie = movie;
    });
  }


  search(value: Event) {
    const searchValue: any = (value.target as HTMLInputElement).value;
    this.searchData = searchValue;
  }
  trendingMovies(): Movie[]{
if(!this.searchData)
  {
    return this.trendingMovie;
  }
  console.log(this.searchData);
  return this.movie.filter((movie) =>
  movie.title.toLowerCase().includes(this.searchData.toLowerCase().trim())
)
  }

  filterMovies(): Movie[] {
    
    if(!this.searchData){
     return this.movie;
    }
    console.log(this.searchData);
    return this.trendingMovie.filter((movie) =>
    movie.title.toLowerCase().includes(this.searchData.toLowerCase().trim())
  )
  }
}

