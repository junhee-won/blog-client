import S3 from "aws-sdk/clients/s3";
import { v4 as uuidv4 } from "uuid";

export class ImageUploadAdapter {
  constructor(loader) {
    this.loader = loader;
    this.s3 = new S3({
      accessKeyId: process.env.NEXT_PUBLIC_API_AWS_S3_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_API_AWS_S3_ACCESS_SECRET_KEY,
      region: "ap-northeast-2",
    });
  }

  async upload() {
    const file = await this.loader.file;
    return new Promise((resolve, reject) => {
      const key = `images/${uuidv4()}-${file.name}`;
      this.s3.upload(
        {
          Bucket: "blog-image-bucket-123",
          Key: key,
          Body: file,
          ACL: "public-read",
        },
        (err, data) => {
          const location = data.Location.replace(
            process.env.NEXT_PUBLIC_API_S3_URL,
            process.env.NEXT_PUBLIC_API_CLOUDFRONT_URL
          );
          if (err) {
            reject(err);
          } else {
            resolve({
              default: location,
            });
          }
        }
      );
    });
  }

  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
}
