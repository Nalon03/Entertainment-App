import { Component } from '@angular/core';
import { NavItems } from '../../interface/navItem';
import { CommonModule, NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  navItems: NavItems[] = [
    {
      name: 'grid_view',
      location: '../home',
      img: '../../../assets/icon-nav-home.svg',
    },
    {
      name: 'theaters',
      location: '../movies',
      img: '../../../assets/icon-nav-movies.svg',
    },
    {
      name: 'live_tv',
      location: '../series',
      img: '../../../assets/icon-nav-tv-series.svg',
    },
    {
      name: 'bookmark',
      location: '../bookmarks',
      img: '../../../assets/icon-nav-bookmark.svg',
    },
  ];

  isCurrentLocation(location: string): boolean {
    const trimmedLocation = location.trim().replace('..', '');
    return window.location.pathname === trimmedLocation;

  }
}
