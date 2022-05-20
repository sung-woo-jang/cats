import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
  // try {
  if (!fs.existsSync(path.join(__dirname, '..', 'uploads')))
    fs.mkdirSync(path.join(__dirname, '..', 'uploads'));
  // console.log('💾 Create a root uploads folder...');
  // fs.mkdirSync(path.join(__dirname, '..', `uploads`));
  // } catch (error) {
  // console.log('The folder already exists...');
  // }
  // try {

  // console.log(`💾 Create a ${folder} uploads folder...`);
  if (!fs.existsSync(path.join(__dirname, '..', `uploads/${folder}`)))
    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
  // fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
  // } catch (error) {
  // console.log(`The ${folder} folder already exists...`);
  // }
};

// 폴더이름 받기
const storage = (folder: string): multer.StorageEngine => {
  // 폴더 만드는 함수
  createFolder(folder);

  return multer.diskStorage({
    destination(req, file, cb) {
      //* 어디에 저장할 지
      const folderName = path.join(__dirname, '..', `uploads/${folder}`);
      cb(null, folderName);
    },
    filename(req, file, cb) {
      //* 어떤 이름으로 올릴 지
      const ext = path.extname(file.originalname); // 확장자 추출 (.image 이렇게 .까지 추출됨)

      const fileName = `${path.basename(
        file.originalname,
        ext,
      )}${Date.now()}${ext}`;

      cb(null, fileName);
    },
  });
};

//@UseInterceptors(FileInterceptor('image'))
// 여기 두번째 인자에 넣어줄 options
export const multerOptions = (folder: string): MulterOptions => ({
  storage: storage(folder),
});
