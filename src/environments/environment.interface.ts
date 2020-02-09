export interface BaseEnvironment {
    apiURL: string;
}

export interface Environment extends BaseEnvironment {
    production: boolean;
}

