import {Routes} from '@angular/router';
import {Home} from './home/home';
import {Details} from './details/details';
import { Login } from './login/login';
import { Signup } from './signup/signup';
const routeConfig: Routes = [
  { path: 'login', component: Login, title: 'Connexion' }, // RACINE
  { path: 'signup', component: Signup, title: 'Inscription' },
  { path: '', component: Home, title: 'Home page' },
  { path: 'details/:id', component: Details, title: 'Home details' },
];

export default routeConfig;