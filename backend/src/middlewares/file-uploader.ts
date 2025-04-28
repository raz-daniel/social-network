import { CreateBucketCommand, S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 } from "uuid";
import config from 'config'
import s3Client from "../aws/aws";

declare global {
    namespace Express {
        interface Request {
            imageUrl?: string
        }
    }
}

export default async function fileUploader (req: Request, res: Response, next: NextFunction) {
    if (!req.files) return next()

    const postImage = req.files.postImage as UploadedFile


    try{
    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: config.get<string>('s3.bucket'),
            Key: `${v4()}${path.extname(postImage.name)}`,
            Body: postImage.data,
            ContentType: postImage.mimetype
        }
    })

    const response = await upload.done()
    req.imageUrl = `${response.Bucket}/${response.Key}`
    next()
} catch(e) {console.log(e.message, e)}
    // req.imageUrl = 'https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg'
}

function V4(): string {
    throw new Error("Function not implemented.");
}
