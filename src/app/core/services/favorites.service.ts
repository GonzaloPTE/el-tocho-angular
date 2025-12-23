import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {
    private readonly FAVORITES_STORAGE_KEY = 'favoriteSongIds';
    favoriteIds = signal<string[]>([]);
    private platformId = inject(PLATFORM_ID);

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            const storedFavorites = localStorage.getItem(this.FAVORITES_STORAGE_KEY);
            if (storedFavorites) {
                try {
                    this.favoriteIds.set(JSON.parse(storedFavorites));
                } catch (e) {
                    console.error('Error parsing favorites', e);
                }
            }
        }

        effect(() => {
            if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem(this.FAVORITES_STORAGE_KEY, JSON.stringify(this.favoriteIds()));
                window.dispatchEvent(new Event('favoritesChanged'));
            }
        });
    }

    addFavorite(songId: string) {
        if (!this.favoriteIds().includes(songId)) {
            this.favoriteIds.update(ids => [...ids, songId]);
        }
    }

    removeFavorite(songId: string) {
        this.favoriteIds.update(ids => ids.filter(id => id !== songId));
    }

    isFavorite(songId: string): boolean {
        return this.favoriteIds().includes(songId);
    }

    toggleFavorite(songId: string) {
        if (this.isFavorite(songId)) {
            this.removeFavorite(songId);
        } else {
            this.addFavorite(songId);
        }
    }
}
