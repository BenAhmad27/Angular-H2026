import { Component, inject, OnInit } from '@angular/core';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../housinglocation';
import { HousingService } from '../housing.service';
import { ActivatedRoute, Router } from '@angular/router';
// Imports Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HousingLocation, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  // Rendre la route publique pour l'accès HTML
  public readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  
  housingLocationList: HousingLocationInfo[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocationInfo[] = [];

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
  }

  ngOnInit() {
    // Écoute les changements d'URL pour filtrer les résultats
    this.route.queryParamMap.subscribe(params => {
      const citySearch = params.get('city') || '';
      this.applyFilter(citySearch);
    });
  }

  // Met à jour la barre d'adresse du navigateur
  updateSearch(text: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { city: text ? text : null },
      queryParamsHandling: 'merge'
    });
  }

  private applyFilter(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((location) =>
      location?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
}