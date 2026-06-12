import { CanActivateFn } from '@angular/router';
import { environment } from 'src/environments/environment';

export const externalRedirectGuard: CanActivateFn = () => {
  if (!environment.production) {
    return true;
  }

  const targetUrl = environment.baseWP ?? 'https://i-nimble.com';
  if (window.location.href !== targetUrl) {
    window.location.href = targetUrl;
  }

  return false;
};
