import {BrowserDomAdapter} from 'angular2/platform/browser';

export class PostMessageService {
    dom = new BrowserDomAdapter();
    addPostMessageListener(fn: EventListener): void {
      this.dom.getGlobalEventTarget('window').addEventListener('message', fn, false)
    }
}
