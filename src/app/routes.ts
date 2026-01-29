import {Routes} from '@angular/router';
import {Home} from './home/home';
import {Details} from './details/details';
import { LoginPage } from './login/login';
import { SignupPage } from './signup/signup';
import { LocationsPage } from './location-page/location-page';
import { LocationFormPage } from './location-form-page/location-form-page';
const routeConfig: Routes = [
  { path: 'login', component: LoginPage, title: 'Connexion' }, 
  { path: 'signup', component: SignupPage, title: 'Inscription' },
  { path: '', component: Home, title: 'Home page' },
  { path: 'details/:id', component: Details, title: 'Home details' },
  { path: 'locations', component: LocationsPage, title: 'locations' },
  { path: 'locations/new', component: LocationFormPage, title: 'location form' },
];

export default routeConfig;