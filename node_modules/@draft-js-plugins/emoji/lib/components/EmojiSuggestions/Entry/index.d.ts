import { EmojiImageProps } from 'packages/emoji/src';
import { Component, ComponentType, MouseEvent, ReactElement } from 'react';
import { EmojiPluginTheme } from '../../../theme';
interface EntryProps {
    emoji: string;
    onEmojiSelect(emoji: string): void;
    index: number;
    onEmojiFocus(index: number): void;
    theme: EmojiPluginTheme;
    isFocused: boolean;
    id: string;
    emojiImage: ComponentType<EmojiImageProps>;
}
export default class Entry extends Component<EntryProps> {
    mouseDown: boolean;
    componentDidUpdate(): void;
    onMouseUp: () => void;
    onMouseDown: (event: MouseEvent) => void;
    onMouseEnter: () => void;
    render(): ReactElement;
}
export {};
