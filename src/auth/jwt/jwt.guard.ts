import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//AuthGuard: 전략을 자동으로 실행해줌
// 얘를 주입받게 되면 JwtStrategy에 validate가 실행이 됨
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
