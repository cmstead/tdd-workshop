export default interface DataModel {
    readonly name: string;

    read: () => [any];
    find: (predicate: (any) => boolean) => [any];
    save: () => void;
}