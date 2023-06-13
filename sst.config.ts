import { SSTConfig } from "sst";
import { ApiStack } from "./stacks/ApiStack";
import { StorageStack } from "./stacks/StorageStack";
import { AuthStack } from "./stacks/AuthStack";

export default {
  config(_input) {
    return {
      name: "wuac",
      region: "ap-northeast-1",
    };
  },
  stacks(app) {
    app.setDefaultRemovalPolicy("destroy");
    app.setDefaultFunctionProps({
      runtime: "python3.9",
    });
    app.stack(StorageStack).stack(ApiStack).stack(AuthStack);
  },
} satisfies SSTConfig;
