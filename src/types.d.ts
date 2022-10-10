export interface Config {
    cronTime: string;
    defaultKeep?: number;
    outputDir: string;
    instances: DatabaseInstance[];
}

export interface DatabaseInstance {
    host: string;
    port: number;
    user: string;
    password: string;
    engine?: string;
    databases: Database[];
}

export interface Database {
    name: string;
    keep?: number;
}
