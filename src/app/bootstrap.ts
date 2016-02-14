import {bootstrap} from 'angular2/platform/browser'
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {provide} from 'angular2/core';
import {AppComponent} from './app.component';

// Service injections
import {CartoDBService} from './services/api/cartodb.service';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS,
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    HTTP_PROVIDERS,
    CartoDBService,
]);
