// loading.interceptor.ts
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { HttpInterceptorFn } from '@angular/common/http';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  loadingService.show();

  return next(req).pipe(finalize(() => loadingService.hide()));
};
