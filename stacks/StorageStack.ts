import { Bucket, Table, StackContext } from "sst/constructs";

export function StorageStack({ stack }: StackContext) {
  // create a s3 bucekt
  const uploadBucket = new Bucket(stack, "Uploads");
  // Create the DynamoDB table
  const noteTable = new Table(stack, "Notes", {
    fields: {
      userId: "string",
      noteId: "string",
    },
    primaryIndex: { partitionKey: "userId", sortKey: "noteId" },
  });
  // stack.exportValue(table.tableName);
  return {
    noteTable,
    uploadBucket,
  };
}
