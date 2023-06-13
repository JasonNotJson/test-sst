import { StackContext, Api, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";
import { NoteFunctions } from "../constructs/lambda/lambda-functions";
import { AuthStack } from "./AuthStack";

export function ApiStack({ stack, app }: StackContext) {
  const { noteTable } = use(StorageStack);

  const noteFunctions = NoteFunctions({ stack, app }, noteTable.tableName);

  const api = new Api(stack, "Api", {
    routes: {
      "POST /note": {
        function: noteFunctions.postNoteFunction,
        authorizer: "iam",
      },
      "GET /note/{id}": {
        function: noteFunctions.getNoteFunction,
        authorizer: "iam",
      },
      "GET /notes": {
        function: noteFunctions.getNotesFunction,
        authorizer: "iam",
      },
      "PUT /note/{id}": {
        function: noteFunctions.updateNoteFunction,
        authorizer: "iam",
      },
      "DELETE /note/{id}": {
        function: noteFunctions.deleteNoteFunction,
        authorizer: "iam",
      },
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
  };
}
//{"content":"Hello World","attachment":"hello.jpg"}
