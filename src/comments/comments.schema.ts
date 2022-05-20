import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';

const options: SchemaOptions = { timestamps: true };

@Schema(options)
export class Comments extends Document {
  @ApiProperty({
    example: 'gyomdyung',
    description: '작성한 고양이(User) _id',
    required: true,
  })
  // _id는 몽고DB에서는 원래 ObjectId라는 타입인데
  // 몽구스에서 받아올 때 string으로 변환해주긴 함
  @Prop({ type: Types.ObjectId, required: true, unique: true, ref: 'Cats' })
  @IsNotEmpty()
  author: Types.ObjectId; // 몽구스가 자동으로 string으로 변환해주긴 함

  @ApiProperty({
    example: 'ㄹㅇㅋㅋ만 치라고 아ㅋㅋ',
    description: '댓글 내용',
    required: true,
  })
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  contents: string;

  @ApiProperty({
    description: '좋아요 수',
  })
  @Prop({ required: true, default: 0 })
  @IsPositive()
  likeCount: number;

  @ApiProperty({
    example: '엄준식',
    description: '작성 대상 (게시물, 정보글)',
    required: true,
  })
  @Prop({ type: Types.ObjectId, required: true, unique: true, ref: 'Cats' })
  @IsNotEmpty()
  info: Types.ObjectId;
}

// 클래스를 실제 스키마로 만들어 주는 부분
export const CommentsSchema = SchemaFactory.createForClass(Comments);
