import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const uploadFileToS3 = async (bucketName: string, key: string, fileContent: string) => {
    // Create S3 client
    const s3Client = new S3Client({});

    // Set upload parameters
    const params = {
        Body: fileContent,
        Bucket: bucketName,
        Key: key,
    };

    try {
        // Upload file to S3
        const command = new PutObjectCommand(params);
        const response = await s3Client.send(command);
        console.log("File uploaded successfully", response);
    } catch (error) {
        console.error("Error uploading file", error);
    }
};
