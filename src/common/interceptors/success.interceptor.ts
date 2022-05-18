import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // data: 일단, 컨트롤러가 return한 데이터를 받는놈으로 기억
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      })),
    );
  }
}
