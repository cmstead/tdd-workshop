export declare interface CliOptions {
    name: string
    action: (...args: any) => void
    
    alias?: string
    defaultOption?: any
    type?: BooleanConstructor | StringConstructor | NumberConstructor
}

export declare interface CliOptionsSet {
    [name: string]: CliOptions
}