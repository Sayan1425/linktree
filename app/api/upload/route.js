import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import uniqid from 'uniqid';

export async function POST(req) {
  const formData = await req.formData();

  if (formData.has('file')) {
    const file = formData.get('file');

    const s3Client = new S3Client({
      region: 'ap-south-1',
      credentials: {  // lowercase 'credentials'
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });

    const randomId = uniqid();
    const ext = file.name.split('.').pop(); // use file.name, not file
    const newFileName = `${randomId}.${ext}`;
    const bucketName = process.env.BUCKET_NAME;

    // Convert file stream to buffer
    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    const fileBuffer = Buffer.concat(chunks); // corrected 'Buffer.contact'

    // Upload file
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newFileName,
        ACL: 'public-read',
        Body: fileBuffer,
        ContentType: file.type,
      })
    );

    const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;

    return Response.json(link);
  }

  return Response.json({ error: 'No file provided' }, { status: 400 });
}
