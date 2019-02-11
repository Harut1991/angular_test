import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import {Component} from '@angular/core';
import {RouterLoaderService} from './router-loader.service';

@Component({
  selector: 'app-router-loader',
  templateUrl: './router-loader.component.html'
})
export class RouterLoaderComponent {

  loading = true;
  loadingEvent = false;

  constructor(private router: Router, private routerLoaderService: RouterLoaderService) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
    // Shows and hides the loading spinner in custom cases using Subject in service
    this.routerLoaderService.$loader.subscribe(state => {
      if (typeof  state === 'boolean') {
        this.loadingEvent = state;
        this.loading = state;
        if (this.loadingEvent === false) {
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
      } else {
        this.loadingEvent = state.loader;
        this.loading = state.loader;
      }
    });
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd && !this.loadingEvent) {
      this.loading = false;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }
}
