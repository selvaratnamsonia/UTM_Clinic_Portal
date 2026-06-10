import { Storage } from '@google-cloud/storage';

// 1. Initialize storage using your project ID
const storage = new Storage({
  projectId: 'utm-clinic-portal'
});

// 2. Specify your bucket path name (from your logs)
const bucketName = 'utm-clinic-portal.firebasestorage.app';

async function configureBucketCors() {
  try {
    console.log(`Setting CORS rules for bucket: ${bucketName}...`);
    
    await storage.bucket(bucketName).setCorsConfiguration([
      {
        maxAgeSeconds: 3600,
        method: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
        origin: ['http://localhost:5000', 'http://127.0.0.1:5000'],
        responseHeader: ['Content-Type', 'Authorization', 'x-goog-meta-*'],
      },
    ]);

    console.log('✅ Success! CORS configuration applied cleanly to your Firebase Storage.');
  } catch (error) {
    console.error('❌ Failed to set CORS configuration:', error);
  }
}

configureBucketCors();