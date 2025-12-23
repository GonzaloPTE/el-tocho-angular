import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly THEME_KEY = 'theme';
    isDarkMode = signal<boolean>(false);
    private platformId = inject(PLATFORM_ID);

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            // Initialize theme from localStorage or system preference
            const savedTheme = localStorage.getItem(this.THEME_KEY);
            if (savedTheme) {
                this.isDarkMode.set(savedTheme === 'dark');
            } else {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                this.isDarkMode.set(prefersDark);
            }
        }

        // Synchronize with document and localStorage
        effect(() => {
            const dark = this.isDarkMode();
            if (isPlatformBrowser(this.platformId)) {
                if (dark) {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem(this.THEME_KEY, 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem(this.THEME_KEY, 'light');
                }
            }
        });
    }

    toggleDarkMode() {
        this.isDarkMode.update(v => !v);
    }
}
