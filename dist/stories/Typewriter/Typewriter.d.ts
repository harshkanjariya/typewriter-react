import React from "react";
import './typewriter.css';
export interface TypewriterProps {
    useLock?: boolean;
    delay?: number;
    cursorColor?: string;
    cursorWidth?: number;
    style?: any;
}
export interface TypewriterHandlers {
    write: (text: string) => void;
    deleteChars: (count: number) => void;
    move: (count: number) => void;
    setDelay: (delay: number) => void;
}
export interface TypewriterEvent {
    type: 'write' | 'delete' | 'move';
    text?: string;
    count?: number;
}
declare const Typewriter: React.ForwardRefExoticComponent<TypewriterProps & React.RefAttributes<TypewriterHandlers>>;
export default Typewriter;
