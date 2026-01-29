import { Component, inject, OnInit, signal } from '@angular/core'; // Ajout de signal
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../service/housing-s';
import { HousingLocationInfo } from '../housinglocation';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatFormFieldModule, MatInputModule, 
    MatButtonModule, MatIconModule, MatChipsModule, MatDividerModule,
    CommonModule
  ],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly housingService = inject(HousingService);

  // Utilisation d'un Signal au lieu d'une variable classique
  housingLocation = signal<HousingLocationInfo | undefined>(undefined);

  applyForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.housingService.getHousingLocationById(id).subscribe(data => {
        // Martha renvoie un tableau (ex: [{...}]). On prend le premier élément.
        if (data && data.length > 0) {
        this.housingLocation.set(data[0]); 
        }
    });
  }

  submitApplication() {
    if (this.applyForm.valid) {
      // Accès à la valeur du Signal avec des parenthèses ()
      console.log('Candidature envoyée pour :', this.housingLocation()?.name);
    }
  }
}