// image-upload.model.ts
export class ImageUpload {
  id?: number;
  imageDetails?: string;
  filePath?: string;
  filename?: string;
  url: any;


  constructor(init?: Partial<ImageUpload>) {
    Object.assign(this, init);
  }
}
