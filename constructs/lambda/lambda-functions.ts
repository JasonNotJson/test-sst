import { Function } from "sst/constructs";
import { StackContext } from "sst/constructs";

export function NoteFunctions({ stack }: StackContext, tableName: string) {
  // Create the postNoteFunction
  const postNoteFunction = new Function(stack, "PostNoteFunction", {
    handler: "functions/src/post-note/index.handler",
    permissions: ["dynamodb", "s3"],
    environment: { tableName },
    description: "AWS Lambda function to post a note",
    functionName: "Post-Note",
  });

  // Create the getNoteFunction
  const getNoteFunction = new Function(stack, "GetNoteFunction", {
    handler: "functions/src/get-note/index.handler",
    permissions: ["dynamodb"],
    environment: { tableName },
    description: "AWS Lambda function to get a note",
    functionName: "Get-Note",
  });

  const getNotesFunction = new Function(stack, "GetNotesFunction", {
    handler: "functions/src/get-notes/index.handler",
    permissions: ["dynamodb"],
    environment: { tableName },
    description: "AWS Lambda function to get all notes",
    functionName: "Get-Notes",
  });

  const updateNoteFunction = new Function(stack, "UpdateNoteFunction", {
    handler: "functions/src/update-note/index.handler",
    permissions: ["dynamodb"],
    environment: { tableName },
    description: "AWS Lambda function to update a note",
    functionName: "Update-Note",
  });

  const deleteNoteFunction = new Function(stack, "DeleteNoteFunction", {
    handler: "functions/src/delete-note/index.handler",
    permissions: ["dynamodb"],
    environment: { tableName },
    description: "AWS Lambda function to delete a note",
    functionName: "Delete-Note",
  });

  // Return the functions as an object
  return {
    postNoteFunction,
    getNoteFunction,
    getNotesFunction,
    updateNoteFunction,
    deleteNoteFunction,
  };
}
