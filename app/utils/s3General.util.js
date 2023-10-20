import {
  PutObjectCommand, S3Client, GetObjectCommand, DeleteObjectCommand
} from '@aws-sdk/client-s3';
import envConfig from '../configs/env.config';

export async function S3UploadGeneral(file) {
  const bucketParams = {
    Bucket: envConfig.s3.bucketBEAN,
    Key: `${new Date().getTime()}-${file.originalname}`,
    Body: file.buffer
  };

  const s3Client = new S3Client({
    region: envConfig.s3.regionBEAN,
    credentials: {
      accessKeyId: envConfig.s3.accessKeyBEAN,
      secretAccessKey: envConfig.s3.secretKeyBEAN
    }
  });

  try {
    await s3Client.send(new PutObjectCommand(bucketParams));
    return `https://${envConfig.s3.bucketBEAN}.s3.${envConfig.s3.regionBEAN}.amazonaws.com/${bucketParams.Key}`;
  }
  catch (err) {
    throw new Error(err.message);
  }
}

export async function S3GetFile(key, isDetail = false) {
  const bucketParams = {
    Bucket: envConfig.s3.bucketBEAN,
    Key: key
  };

  const s3Client = new S3Client({
    region: envConfig.s3.regionBEAN,
    credentials: {
      accessKeyId: envConfig.s3.accessKeyBEAN,
      secretAccessKey: envConfig.s3.secretKeyBEAN
    }
  });

  try {
    const data = await s3Client.send(new GetObjectCommand(bucketParams));

    const getBody = new Promise((resolve, reject) => {
      const buffer = [];
      data.Body.on('data', (chunk) => {
        buffer.push(chunk);
      });
      data.Body.once('end', () => {
        const completedBuffer = Buffer.concat(buffer);
        resolve(completedBuffer);
      });
      data.Body.once('error', (err) => reject(err));
    });

    const fileData = await getBody;
    return isDetail ? {
      fileData,
      contentType: data.ContentType,
      contentLength: data.ContentLength
    } : fileData;
  }
  catch (err) {
    throw new Error(err.message);
  }
}

/**
 * For deleting file from aws S3
 * @param {string} key The S3 key of file
 * @returns
 */
export async function S3DeleteFile(key) {
  const bucketParams = {
    Bucket: envConfig.s3.bucketBEAN,
    Key: key
  };

  const s3Client = new S3Client({
    region: envConfig.s3.regionBEAN,
    credentials: {
      accessKeyId: envConfig.s3.accessKeyBEAN,
      secretAccessKey: envConfig.s3.secretKeyBEAN
    }
  });

  try {
    await s3Client.send(new DeleteObjectCommand(bucketParams));

    return true;
  }
  catch (err) {
    throw new Error(err.message);
  }
}

export default function f() {}
