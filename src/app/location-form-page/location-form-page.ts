import { Component } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-location-form',
  imports: [
    MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatCheckboxModule
  ],
  templateUrl: './location-form-page.html' ,
  styleUrl: './location-form-page.css'
})
export class LocationFormPage {

}