import Typewriter, {TypewriterHandlers, TypewriterProps} from "./Typewriter";
import type {Meta, Story, StoryFn, StoryObj} from '@storybook/react';
import {useRef} from "react";

const meta = {
  title: 'Component/Typewriter',
  component: Typewriter,
  tags: ['autodocs'],
  argTypes: {
    useLock: {
      name: 'useLock',
      description: 'If passed true all functions will be called when animation is not running',
      control: 'boolean',
    }
  }
} satisfies Meta<TypewriterProps>;

export default meta;

function TypewriterUsage(props: any) {
  const ref = useRef({} as HTMLInputElement);
  const writerRef = useRef({} as TypewriterHandlers);

  return <div>
    <Typewriter {...props.args} text={'hello'} ref={writerRef}/>
    <input type="text" ref={ref}/>
    <button onClick={() => {
      writerRef.current.write(ref.current?.value || '');
    }}>write
    </button>
    <button onClick={() => {
      writerRef.current.deleteChars(parseInt(ref.current.value));
    }}>delete
    </button>
    <button onClick={() => {
      writerRef.current.move(parseInt(ref.current.value));
    }}>move
    </button>
  </div>;
}

export const Primary: StoryObj<TypewriterProps> = {
  args: {
    useLock: true,
  },
  render: (args) => <TypewriterUsage args={args}/>,
}