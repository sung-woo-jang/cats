import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CommentsSchema } from 'src/comments/comments.schema';
import { Cat } from './cats.schema';
import { CatCurrentDto } from './dto/cats.current.dto';
import { CatRequestDto } from './dto/cats.request.dto';
import * as mongoose from 'mongoose';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findAll() {
    const CommentsModel = mongoose.model('comments', CommentsSchema);
    const result = await this.catModel
      .find()
      .populate('comments', CommentsModel);
    return result;
    // return await this.catModel.find();
  }

  async findByIdAndUpdateImg(id: string, fileName: string) {
    const cat = await this.catModel.findById(id);

    cat.imgUrl = `http://localhost:8000/media/${fileName}`;

    const newCat = await cat.save();

    // console.log(newCat);
    return newCat.readOnlyData;
  }

  async findCatByIdWithoutPassword(
    catId: string | Types.ObjectId,
  ): Promise<CatCurrentDto | null> {
    const cat = await this.catModel.findById(catId).select('-password');
    return cat;
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = (await this.catModel.exists({ email })) ? true : false;
    return result;
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
