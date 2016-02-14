import {HomeComponent} from './routes/home-route.component';
import {IntroRouteComponent} from './routes/intro-route.component';
import {Router} from 'angular2/router';


export var Routes = {
    slide1: {path: '/intro', as: 'Intro', component: IntroRouteComponent},
    // slide2: {path: '/slide2', as: 'Slide2', component: HomeComponent},
    dashboard: {path: '/app', as: 'Root', component: HomeComponent},
};

export const APP_ROUTES = Object.keys(Routes).map(r => Routes[r]);
