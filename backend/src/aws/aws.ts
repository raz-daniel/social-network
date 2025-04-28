import { CreateBucketCommand, S3Client } from "@aws-sdk/client-s3"
import config from "config"

const s3Config = JSON.parse(JSON.stringify(config.get('s3.connection')))

if (!config.get<boolean>('s3.isLocalstack')) delete s3Config.endpoint

const s3Client = new S3Client(s3Config)


export async function createAppBucketIfNotExists() {
    const bucketName = config.get<string>('s3.bucket');
    try {
        // Try to create the bucket
        await s3Client.send(
            new CreateBucketCommand({
                Bucket: bucketName
            })
        )
        console.log(`----------------------------------------------------------`)
        console.log(`S3 bucket '${bucketName}' created successfully`);
        console.log(`----------------------------------------------------------`)

    } catch (e) {
        // Check if it's because the bucket already exists
        if (e.name === 'BucketAlreadyExists' || e.name === 'BucketAlreadyOwnedByYou') {
            console.log(`S3 bucket '${bucketName}' already exists`);
        } else {
            // Log other types of errors
            console.error(`Error creating S3 bucket '${bucketName}':`, e);
        }
    }
}

export default s3Client