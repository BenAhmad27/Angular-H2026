import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-locations',
  imports: [
    RouterModule,
    MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule,
  ],
  templateUrl: './location-page.html' ,
  styleUrl: './location-page.css' 
})
export class LocationsPage {
    displayedColumns: string[] = ['name', 'city', 'state', 'availableUnits', 'wifi', 'laundry', 'actions'];

  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';
   dataSource = [
    {
      id: 0,
      name: 'Acme Fresh Start Housing',
      city: 'Chicago',
      state: 'IL',
      photo: `${this.baseUrl}/bernard-hermant-CLKGGwIBTaY-unsplash.jpg`,
      availableUnits: 4,
      wifi: true,
      laundry: true,
    },
    {
      id: 1,
      name: 'A113 Transitional Housing',
      city: 'Santa Monica',
      state: 'CA',
      photo: `${this.baseUrl}/brandon-griggs-wR11KBaB86U-unsplash.jpg`,
      availableUnits: 0,
      wifi: false,
      laundry: true,
    },
    {
      id: 2,
      name: 'Warm Beds Housing Support',
      city: 'Juneau',
      state: 'AK',
      photo: `${this.baseUrl}/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg`,
      availableUnits: 1,
      wifi: false,
      laundry: false,
    },
  ]

  availabilityIcon(available: boolean | undefined): string | undefined {

        if( available != undefined ) {
            return available ? 'check' : 'close'
        }

        return undefined
  }

}