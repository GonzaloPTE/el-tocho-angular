import { Component, inject, computed, signal } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { SongService } from '../../core/services/song.service';
import { Breadcrumb, BreadcrumbItem } from '../../components/breadcrumb/breadcrumb';
import { CategorySongList } from '../../components/category-song-list/category-song-list';

@Component({
  selector: 'app-songs-list',
  standalone: true,
  imports: [CommonModule, RouterModule, Breadcrumb, CategorySongList],
  templateUrl: './songs-list.html',
  styleUrl: './songs-list.scss',
})
export class SongsListComponent {
  private songService = inject(SongService);
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  searchTerm = signal('');

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Inicio', href: '/' },
    { label: 'Cancionero Completo' },
  ];

  totalSongs = this.songService.songs().length;
  totalCategories = this.songService.categories().length;

  songsToDisplay = computed(() => {
    const term = this.searchTerm();
    if (!term) return this.songService.songs();

    return this.songService.searchSongs(term, {
      priorityFields: ['title', 'author', 'lyrics', 'code']
    });
  });

  isSearching = computed(() => !!this.searchTerm());

  constructor() {
    this.route.queryParams.subscribe(params => {
      this.searchTerm.set(params['search'] || '');
    });

    const title = 'Cancionero Completo - Todas las Canciones | El Tocho';
    const description = 'Explora el cancionero completo de El Tocho. Encuentra letras y acordes de todas nuestras canciones cristianas, organizadas y listas para usar.';

    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });

    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:image', content: 'https://www.cantoraleltocho.com/images/logo-1x1-1k.png' });
  }
}
