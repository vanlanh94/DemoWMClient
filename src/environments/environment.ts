import { Environment } from "./environment.interface";
import { environment as devEnvironment } from "./environment.dev";

export const environment: Environment = {
    ...devEnvironment
};
