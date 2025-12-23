import { Component, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SongService } from '../../core/services/song.service';
import { CategoryNavigation } from '../../components/category-navigation/category-navigation';
import { Breadcrumb, BreadcrumbItem } from '../../components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule, CategoryNavigation, Breadcrumb],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class CategoriesComponent {
  public songService = inject(SongService);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Inicio', href: '/' },
    { label: 'Categorías' },
  ];

  constructor() {
    const title = 'Categorías de Cantos Litúrgicos | El Tocho';
    const description = 'Explora las categorías de cantos de El Tocho. Encuentra música para cada momento de la misa, organizada temáticamente para facilitar tu selección.';

    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });

    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:image', content: 'https://www.cantoraleltocho.com/images/logo-1x1-1k.png' });
  }
}
