import React, {ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {wait} from "../../utils/functions";
import './typewriter.css';
import * as _ from 'lodash';

export interface TypewriterProps {
  useLock?: boolean;
  delay?: number;
  cursorColor?: string,
  cursorWidth?: number,
  style?: any,
}

export interface TypewriterHandlers {
  write: (text: string) => void,
  deleteChars: (count: number) => void,
  move: (count: number) => void,
  setDelay: (delay: number) => void,
}

export interface TypewriterEvent {
  type: 'write' | 'delete' | 'move';
  text?: string;
  count?: number;
}

const Typewriter = forwardRef(function Typewriter(
  props: TypewriterProps,
  ref: ForwardedRef<TypewriterHandlers>
) {
  const [state, setState] = useState<{
    preText: string,
    postText: string,
    position: number,
    target: Partial<TypewriterEvent>,
  }>({
    preText: '',
    postText: '',
    position: 0,
    target: {},
  });
  const [events, setEvents] = useState<TypewriterEvent[]>([]);
  const [delay, setDelay] = useState(props.delay || 500);
  const [isLocked, setIsLocked] = useState(false);

  async function consumeEvent() {
    await wait(delay);
    switch (state.target.type) {
      case 'write':
        state.position++;
        if (state.position < (state.target.text?.length || 0) + 1) {
          state.preText += state.target.text?.substring(
            state.position - 1, state.position
          ) || '';
        } else {
          state.target.type = undefined;
          state.position = 0;
        }
        break;
      case 'delete':
        state.position++;
        state.preText = state.preText.substring(0, state.preText.length - 1);
        if (!state.preText.length || state.position == state.target.count) {
          state.target.type = undefined;
          state.position = 0;
        }
        break;
      case 'move':
        if (state.target.count) {
          state.position++;
          if (state.target.count < 0) {
            let char = state.preText.substring(state.preText.length - 1);
            state.preText = state.preText.substring(0, state.preText.length - 1);
            state.postText = char + state.postText;
          } else {
            let char = state.postText.substring(0, 1);
            state.postText = state.postText.substring(1);
            state.preText += char;
          }
          if (
            state.position == Math.abs(state.target.count) ||
            !state.preText.length || !state.postText.length
          ) {
            state.target.type = undefined;
            state.position = 0;
          }
        }
        break;
    }
    setState({...state});
  }

  useEffect(() => {
    if (events.length && !state.target.type) {
      setState({
        ...state,
        target: _.clone(events[0]),
      });
      events.shift();
      setEvents([...events]);
      if (props.useLock) setIsLocked(true);
    } else if (!events.length && !state.target.type) {
      setIsLocked(false);
    }
  }, [events, state]);

  useEffect(() => {
    if (state.target.type) {
      consumeEvent();
    }
  }, [state]);

  function move(count: number) {
    if (!count) return;
    if (isNaN(count)) return;

    setEvents([...events, {
      type: 'move',
      count,
    }]);
  }

  function write(text: string) {
    if (!text) return;
    if (isLocked) return;

    setEvents([
      ...events,
      {
        type: 'write',
        text,
      }
    ]);
  }

  function deleteChars(count: number) {
    if (!count) return;
    if (isNaN(count)) return;

    setEvents([
      ...events,
      {
        type: 'delete',
        count: Math.abs(count),
      }
    ]);
  }

  useImperativeHandle(ref, () => {
    return {
      write,
      deleteChars,
      move,
      setDelay: (delay: number) => {
        if (!delay) return;
        if (isNaN(delay)) return;
        setDelay(delay);
      },
    }
  }, [state, isLocked, delay, events]);

  return <div style={props.style} className={'typewriter'}>
    {state.preText}
    <span className={'cursor-parent'}>
      <span style={{
        width: props.cursorWidth,
        height: props.style?.fontSize,
        backgroundColor: props.cursorColor || props.style?.color,
      }} className={'cursor'+ (state.target.type ? '' : ' blink')}/>
    </span>
    {state.postText}
  </div>;
});

Typewriter.defaultProps = {
  useLock: true,
  delay: 500,
  cursorColor: 'black',
  cursorWidth: 1,
  style: {
    fontSize: 16,
  }
};

export default Typewriter;