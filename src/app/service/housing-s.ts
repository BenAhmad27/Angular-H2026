import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HousingLocationInfo } from '../housinglocation';
import { MarthaRequestService } from './martha-request-s';
import { UserCredentials } from '../models/user-credential';

@Injectable({
  providedIn: 'root',
})

export class HousingService {

  constructor(private martha: MarthaRequestService) {}

  getAllHousingLocations() {
    return this.martha.select('select-locations',  { email: null });
  }

  getHousingLocationById(id: number) {
    return this.martha.select('select-location', { id, email: null });
  }
}