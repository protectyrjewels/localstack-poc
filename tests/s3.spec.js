const { createBucket, deleteAllBuckets, listBuckets } = require("../s3");

beforeAll(async () => {
  await deleteAllBuckets();
})

it("localstack should work", async () => {
  const expectedBuckets = ["movies", "music"];

  for (const bucket of expectedBuckets) {
    await createBucket(bucket);
  }

  const buckets = await listBuckets();

  expect(buckets.Buckets.map(b => b.Name)).toEqual(expectedBuckets);
});
