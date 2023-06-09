# Typewriter

The Typewriter component is a React component that provides typewriter animation effects for displaying text. It allows you to create dynamic typewriter-like animations by simulating the gradual appearance, deletion, and movement of text.

## Installation

Install the Typewriter component from npm:

```shell
npm install react-typewriter-component
```

### Usage

Import the Typewriter component into your React application:

```jsx
import React from 'react';
import Typewriter from 'react-typewriter-component';

const App = () => {
    return (
        <div>
            <Typewriter
                useLock={true}
                delay={500}
                cursorColor="black"
                cursorWidth={1}
                style={{
                    fontSize: 16,
                }}
            />
        </div>
    );
}

export default App;
```

### Props

The Typewriter component accepts the following props:

| Prop          | Type     | Default Value | Description                                                                                  |
| ------------- | -------- | ------------- | -------------------------------------------------------------------------------------------- |
| `useLock`     | boolean  | `true`        | Determines whether the component should be locked during the animation process.             |
| `delay`       | number   | `500`         | The delay (in milliseconds) between each animation frame.                                    |
| `cursorColor` | string   | `"black"`     | The color of the cursor.                                                                     |
| `cursorWidth` | number   | `1`           | The width (in pixels) of the cursor.                                                         |
| `style`       | object   | -             | Additional CSS styles to apply to the component.                                             |
| `onAnimationEnd` | function | -             | A callback function to be invoked when the animation ends.                                   |

### Typewriter Component Handlers

The Typewriter component exposes the following handlers through the `ref` prop:

#### `write(text: string)`

Writes the specified text to the typewriter component.

- `text` (string): The text to be written.

#### `deleteChars(count: number)`

Deletes the specified number of characters from the typewriter component.

- `count` (number): The number of characters to delete.

#### `move(count: number)`

Moves the cursor in the typewriter component by the specified count.

- `count` (number): The number of positions to move. Negative values move the cursor backward, and positive values move it forward.

#### `setDelay(delay: number)`

Sets the delay (in milliseconds) between animation events in the typewriter component.

- `delay` (number): The delay value to set.

Example usage:

```jsx
import React, { useRef } from 'react';
import Typewriter, { TypewriterHandlers } from 'react-typewriter-component';

const MyComponent = () => {
  const typewriterRef = useRef<TypewriterHandlers>(null);

  const handleClick = () => {
    typewriterRef.current?.setDelay(300);
    typewriterRef.current?.write('Hello World!');
    typewriterRef.current?.move(-3);
    typewriterRef.current?.deleteChars(5);
  };

  return (
    <div>
      <Typewriter ref={typewriterRef} onAnimationEnd={() => console.log('Animation ended')} />
      <button onClick={handleClick}>Animate</button>
    </div>
  );
};

export default MyComponent;
```

