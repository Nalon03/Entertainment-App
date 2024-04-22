import { Component } from '@angular/core';
import { NavBarComponent } from '../../app/components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './bookmarks.component.html',
  styleUrl: './bookmarks.component.css',
})
export class BookmarksComponent {}