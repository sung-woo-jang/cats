import { PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

// request용 dto
export class CatRequestDto extends PickType(Cat, [
  'email',
  'name',
  'password',
] as const) {}
