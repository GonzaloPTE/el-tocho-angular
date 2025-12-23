import { Component, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SongService } from '../../core/services/song.service';
import { SearchBar } from '../../components/client/search-bar/search-bar';
import { CategoryNavigation } from '../../components/category-navigation/category-navigation';
import { FeaturedSongNavigation } from '../../components/featured-song-navigation/featured-song-navigation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBar, CategoryNavigation, FeaturedSongNavigation],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent {
  public songService = inject(SongService);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  constructor() {
    this.titleService.setTitle('Cantoral El Tocho - Acordes y Letras de Canciones');
    this.metaService.updateTag({ name: 'description', content: 'Encuentra acordes y letras de miles de canciones en español. Explora nuestro cancionero digital y toca tus canciones favoritas.' });

    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: 'Cantoral El Tocho - Acordes y Letras de Canciones' });
    this.metaService.updateTag({ property: 'og:description', content: 'Encuentra acordes y letras de miles de canciones en español. Explora nuestro cancionero digital y toca tus canciones favoritas.' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://www.cantoraleltocho.com/images/logo-1x1-1k.png' });
  }
}
