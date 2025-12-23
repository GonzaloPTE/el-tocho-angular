import { Component, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Breadcrumb, BreadcrumbItem } from '../../components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, Breadcrumb],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class AboutComponent {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Inicio', href: '/' },
    { label: 'Acerca de El Tocho' },
  ];

  constructor() {
    const title = 'Acerca de Cantoral El Tocho | Nuestra Historia y Misión';
    const description = 'Conoce la historia de Cantoral El Tocho, nuestro cantoral misionero. Descubre nuestra misión de evangelizar a través de la música y el trabajo del Coro9.';

    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });

    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:image', content: 'https://www.cantoraleltocho.com/images/logo-1x1-1k.png' });
  }
}
