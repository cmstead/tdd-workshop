# Menu Builder API #

The MenuBuilder API is a thin wrapper over the Inquirer (inquirer on npm) library to simplify the process of gathering information from users via menus and keyboard input.

The exposed API provides access to the input (keyboard input), editor (multiline keyboard input), and list (menu selection) input methods.

## API ##

- `MenuBuilder.build(): MenuBuilder` - builds a new instance of MenuBuilder

- `instance.addTextInput(object): MenuBuilder` - add a text input behavior chronologically next in the user input flow. Method input object is as follows:

```typescript
{
    valueName: string,
    description: string,
    defaultValue?: string,
    validator?: (any) => boolean
}
```

- `instance.addEditorInput(object): MenuBuilder` - add a multiline input behavior chronologically next in the user input flow. Method input object is as follows:

```typescript
{
    valueName: string,
    description: string,
    validator?: (any) => boolean
}
```

- `instance.addListInput(object): MenuBuilder` - add a list/menu behavior chronologically next in the user input flow. Method input object is as follows:

```typescript
{
    valueName: string,
    description: string,
    choices?: string[]
}
```

- `instance.exec(): Promise<object>` - display menu and receive user input as a result.