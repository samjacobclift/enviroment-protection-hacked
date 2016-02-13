import {bootstrap} from 'angular2/platform/browser'
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './app.component';

// Service injections
import {ApiService} from './services/api/api.service';
import {PostMessageService} from './services/events/post-message.service';

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS,
                         ApiService, PostMessageService]);
