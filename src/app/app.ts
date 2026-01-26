import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

// Imports Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

// Pour le responsive
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, RouterOutlet, RouterLink,
    MatToolbarModule, MatButtonModule, MatSidenavModule, 
    MatIconModule, MatListModule
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #drawer class="sidenav" fixedInViewport
          [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'"
          [mode]="(isHandset$ | async) ? 'over' : 'side'"
          [opened]="(isHandset$ | async) === false">
        
      </mat-sidenav>

      <mat-sidenav-content>

        <mat-toolbar color="primary">
          <button type="button" mat-icon-button (click)="drawer.toggle()" *ngIf="isHandset$ | async">
            <mat-icon aria-label="Menu">menu</mat-icon>
          </button>
          
          <img class="brand-logo" src="/logo.svg" alt="logo" style="height: 40px; margin-right: 10px;">
         

          <span style="flex: 1 1 auto;"></span> 

          <button mat-button routerLink="login">
            <mat-icon>login</mat-icon> CONNEXION
          </button>

          <button mat-button (click)="logout()">
            <mat-icon>logout</mat-icon> DÉCONNEXION
          </button>
        </mat-toolbar>

        <main class="content">
          <router-outlet />
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container { height: 100vh; }
    .sidenav { width: 240px; }
    .sidenav .mat-toolbar { background: inherit; }
    .mat-toolbar.mat-primary { position: sticky; top: 0; z-index: 2; }
    .content { padding: 20px; }
    .brand-logo { filter: brightness(0) invert(1); } /* Si logo noir sur toolbar bleue */
  `]
})
export class App {
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);

  // Observable qui détecte si on est sur mobile (< 600px)
  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  closeSideNav(drawer: any) {
    this.isHandset$.subscribe(isMobile => {
      if (isMobile) drawer.close();
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user_token');
  }

  logout() {
    localStorage.removeItem('user_token'); // On détruit la session
    this.router.navigate(['/']); // Retour au Login
  }
}