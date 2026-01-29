import { Component, inject, OnInit, signal, computed } from '@angular/core'; // Ajout de signal et computed
import { HousingLocation } from '../housing-location/housing-location';
import { HousingLocationInfo } from '../housinglocation';
import { HousingService } from '../service/housing-s';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'; // Pour transformer l'URL en Signal
import { AuthService } from '../service/auth-s';

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
  public readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private housingService = inject(HousingService);

  private authService = inject(AuthService);

  // 1. Signal pour stocker la liste brute venant de la BD
  housingLocationList = signal<HousingLocationInfo[]>([]);

  // 2. Transformer les Query Params de l'URL en Signal réactif
  private queryParams = toSignal(this.route.queryParamMap);

  // 3. Signal calculé (computed) : se met à jour automatiquement
  // dès que housingLocationList OU l'URL change.
  filteredLocationList = computed(() => {
    const locations = this.housingLocationList();
    const citySearch = this.queryParams()?.get('city')?.toLowerCase() || '';

    if (!citySearch) return locations;

    return locations.filter(location => 
      location?.city.toLowerCase().includes(citySearch)
    );
  });

  ngOnInit(): void {
    const email = this.authService.currentUser?.email || null;

    // Charger les données de la BD immédiatement
    this.housingService.getAllHousingLocations().subscribe(data => {
      this.housingLocationList.set(data);
    });
  }

  updateSearch(text: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { city: text ? text : null },
      queryParamsHandling: 'merge'
    });
  }
}