import { Component, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { Breadcrumb, BreadcrumbItem } from '../../components/breadcrumb/breadcrumb';

interface DownloadItem {
  id: string;
  url: string;
  name: string;
  year: number;
  editor: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, Breadcrumb],
  templateUrl: './downloads.html',
  styleUrl: './downloads.scss',
})
export class DownloadsComponent {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Inicio', href: '/' },
    { label: 'Descargas' },
  ];

  constructor() {
    const title = 'Descargar El Tocho en PDF - Versiones Imprimibles del Cantoral';
    const description = 'Accede a las versiones PDF imprimibles de El Tocho. Descarga las diferentes ediciones de nuestro cantoral cristiano para tu comunidad o uso personal.';

    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });

    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:image', content: 'https://www.cantoraleltocho.com/images/logo-1x1-1k.png' });
  }

  downloadItems: DownloadItem[] = [
    {
      id: "el-tocho-7",
      url: "https://descargas.cantoraleltocho.com/el-tocho-7-coro9.pdf",
      name: "El Tocho 7",
      year: 2017,
      editor: "Coro9 (C9)",
      description: "La séptima edición de nuestro querido cantoral. Esta versión imprimible en PDF continúa la misión de 'El Tocho', recopilando cantos significativos y ofreciendo un recurso práctico y actualizado para la animación litúrgica, fruto del trabajo y espíritu misionero del Coro9.",
      imageUrl: "/images/el-tocho-7-pdf-portada.jpg",
      imageAlt: "Portada de El Tocho 7",
    },
    {
      id: "el-tocho-6",
      url: "https://descargas.cantoraleltocho.com/el-tocho-6-coro9.pdf",
      name: "El Tocho 6",
      year: 2012,
      editor: "Coro9 (C9)",
      description: "Una valiosa edición anterior, disponible como PDF imprimible. 'El Tocho 6' representa un hito en el crecimiento de este proyecto, reuniendo cantos aprendidos en la labor parroquial y encuentros de la comunidad redentorista.",
      imageUrl: "/images/el-tocho-6-pdf-portada.jpg",
      imageAlt: "Portada de El Tocho 6",
    },
    {
      id: "el-tocho-5",
      url: "https://descargas.cantoraleltocho.com/el-tocho-5-coro9.pdf",
      name: "El Tocho 5",
      year: 2010,
      editor: "Coro9 (C9)",
      description: "Los orígenes disponibles en PDF. 'El Tocho 5' sienta las bases de esta iniciativa, con la idea de aunar canciones importantes a nivel personal y comunitario para los primeros componentes del coro.",
      imageUrl: "/images/el-tocho-5-pdf-portada.jpg",
      imageAlt: "Portada de El Tocho 5",
    },
  ];
}
