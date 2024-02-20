const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: 'dummy',
  secretAccessKey: 'dummy',
  region: 'us-west-1',
  endpoint: new AWS.Endpoint('http://localhost:4566'),
  s3ForcePathStyle: true
});

async function createBucket(bucketName) {
  const params = {
    Bucket: bucketName,
    CreateBucketConfiguration: {
     LocationConstraint: 'us-west-1'
    }
  };

  try {
    const data = await s3.createBucket(params).promise();
    return data;
  } catch (error) {
    console.log(`Failed to create bucket "${bucketName}".`, error);
    throw error;
  }
}

async function putObjectToBucket(bucketName, key, value) {
  const params = {
    Bucket: bucketName, 
    Key: key, 
    Body: value
  };
  
  try {
    const data = await s3.putObject(params).promise();
    return data;
  } catch (error) {
    console.log(`Failed to put object with key "${key}" to bucket "${bucketName}".`, error);
    throw error;
  }
}

async function listBuckets() {
  const params = {
     
  };
  try {
    const data = await s3.listBuckets(params).promise();
    return data;
  } catch (error) {
    console.log(`Failed to list buckets.`, error);
    throw error;
  }
}

async function deleteAllBuckets() {
  const allBuckets = await listBuckets();
  for (const bucket of allBuckets.Buckets) {
    await s3.deleteBucket({ Bucket: bucket.Name }).promise();
  }
}

module.exports = { createBucket, deleteAllBuckets, putObjectToBucket, listBuckets };
