# CliBuilder API #

This is a thin wrapper over the Command Line Args (command-line-args on npm) library. The goal is to make it simple to add command flags to your software.

## API ##

- `CliBuilder.build(): CliBuilder` - create a new CliBuilder instance
- `instance.registerCommand(CliOptions): CliBuilder` - register a flag and associated action
- `instance.exec(): void` - executes CLI parser and execute the registered action. This will trigger associated behaviors in your application.

## Example ##

```typescript
const cliBuilder = CliBuilder.build();

const sampleCommand = SampleCommand.build(models);

return cliBuilder
    .registerCommand({
        name: 'sample',
        action: args => sampleCommand.exec(args),

        // These are all optional
        alias: 's',
        type: String,
        defaultOption: ''
});
```

At the command line:

`> node ./ sample This is a test`

Internally, this will call sampleCommand with `['This', 'is', 'a', 'test']`