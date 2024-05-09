import { NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Movie } from '../../interface/movie';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [NgClass, NgStyle],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  @Input()
  movies: Movie = {} as Movie;
  bgImage: any = {};
  isBookmarked: boolean = this.movies.isBookmarked;

  ngOnInit(): void {
    this.bgImage = {
      'background-image': `url(${this.movies.thumbnail.regular?.large})`,
    };
    this.checkBookmark();
  }
  handleBookmark() {
    if (this.isBookmarked) {
      this.removeBookmark();
    } else {
      this.addBookmark();
    }
    this.isBookmarked = !this.isBookmarked;
  }
  checkBookmark() {
    const bookmarksString = localStorage.getItem('bookmarks');
    if(bookmarksString) {
       const bookmarks = JSON.parse(bookmarksString);
       const bookmarkedItem = bookmarks.find((bookmark: any) => bookmark.title === this.movies.title);
       bookmarkedItem ? this.isBookmarked = true: this.isBookmarked = false;
    }
  }
  addBookmark() {
    let bookmarks = [];
    const bookmarksString = localStorage.getItem('bookmarks');
    if (bookmarksString) {
      bookmarks = JSON.parse(bookmarksString);
    }
    this.movies.isBookmarked = true;
    bookmarks.push(this.movies);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  removeBookmark() {
    const bookmarksString = localStorage.getItem('bookmarks');
    if (bookmarksString) {
      const bookmarks = JSON.parse(bookmarksString);
      const filteredBookmarks = bookmarks.filter(
        (bookmark: any) => bookmark.title !== this.movies.title
      );
      localStorage.setItem('bookmarks', JSON.stringify(filteredBookmarks));
    }
  }
}
