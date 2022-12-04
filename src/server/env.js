import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand"

const env = dotenv.config();
dotenvExpand.expand(env);
