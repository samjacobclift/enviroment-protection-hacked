import {HomeComponent} from './routes/home-route.component';
import {Router} from 'angular2/router';


export var Routes = {
  dashboard: {path: '/', as: 'Root', component: HomeComponent},
};

export const APP_ROUTES = Object.keys(Routes).map(r => Routes[r]);
