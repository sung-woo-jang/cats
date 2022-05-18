import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Document } from 'mongoose';

const options: SchemaOptions = { timestamps: true };

@Schema(options)
export class Cat extends Document {
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop()
  @IsString()
  imgUrl: string;

  readonly readOnlyData: { id: string; email: string; password: string };
}

// 클래스를 실제 스키마로 만들어 주는 부분
export const CatSchema = SchemaFactory.createForClass(Cat);

// DB에 실제 데이터는 아니지만 비지니스 로직에서 사용할 수 있도록 제공하는 필드

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return { id: this.id, email: this.email, name: this.name };
});
