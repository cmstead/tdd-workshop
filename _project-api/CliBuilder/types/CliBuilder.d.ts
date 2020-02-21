export type parameterType = BooleanConstructor | StringConstructor | NumberConstructor;

export declare interface CliOptions {
    name: string
    action: (...args: any[]) => void
    
    alias?: string
    defaultOption?: string
    type?: parameterType
}

export declare interface CliOptionsSet {
    [name: string]: CliOptions
}