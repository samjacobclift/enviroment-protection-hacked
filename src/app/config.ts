import {HomeComponent} from './routes/home-route.component';
import {IntroRouteComponent} from './routes/intro-route.component';
import {DaysToResolveRouteComponent} from './routes/days-to-resolve-graph.component';
import {PopRequestRouteComponent} from './routes/pop-request-component';

import {Router} from 'angular2/router';


export var Routes = {
    slide1: {path: '/intro', as: 'Intro', component: IntroRouteComponent},
    daysToResolve: {path: '/days-to-resolve', as: 'DaysToResolve', component: DaysToResolveRouteComponent},
    popRequest: {path: '/pop-request', as: 'PopRequest', component: PopRequestRouteComponent},
    // slide2: {path: '/slide2', as: 'Slide2', component: HomeComponent},
    dashboard: {path: '/app', as: 'Root', component: HomeComponent, useAsDefault: true},


};

export const APP_ROUTES = Object.keys(Routes).map(r => Routes[r]);
