import { Component, ComponentType, ReactElement } from 'react';
import PropTypes from 'prop-types';
import Groups from './Groups';
import { EmojiImageProps, EmojiPluginStore, EmojiPluginTheme, EmojiSelectGroup } from '../../../index';
import { EmojiStrategy } from '../../../utils/createEmojisFromStrategy';
import Entry from './Entry';
interface PopoverProps {
    theme: EmojiPluginTheme;
    store: EmojiPluginStore;
    groups: EmojiSelectGroup[];
    emojis: EmojiStrategy;
    toneSelectOpenDelay: number;
    isOpen?: boolean;
    emojiImage: ComponentType<EmojiImageProps>;
    onEmojiSelect(): void;
    menuPosition?: 'top' | 'bottom';
}
export default class Popover extends Component<PopoverProps> {
    static propTypes: {
        theme: PropTypes.Validator<object>;
        store: PropTypes.Validator<object>;
        groups: PropTypes.Validator<(object | null | undefined)[]>;
        emojis: PropTypes.Validator<object>;
        toneSelectOpenDelay: PropTypes.Validator<number>;
        isOpen: PropTypes.Requireable<boolean>;
        menuPosition: PropTypes.Requireable<string>;
    };
    activeEmoji: Entry | null;
    toneSelectTimer: ReturnType<typeof setTimeout> | null;
    mouseDown: boolean;
    toneSet: string[] | null;
    container?: HTMLDivElement | null;
    groupsElement?: Groups | null;
    static defaultProps: {
        isOpen: boolean;
    };
    state: {
        activeGroup: number;
        showToneSelect: boolean;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    onMouseDown: () => void;
    onMouseUp: () => void;
    onEmojiSelect: (emoji: string) => void;
    onEmojiMouseDown: (emojiEntry: Entry, toneSet: string[] | null) => void;
    onGroupSelect: (groupIndex: number) => void;
    onGroupScroll: (groupIndex: number) => void;
    openToneSelectWithTimer: (toneSet: string[] | null) => void;
    openToneSelect: (toneSet: string[] | null) => void;
    closeToneSelect: () => void;
    checkMouseDown: () => boolean;
    renderToneSelect: () => ReactElement | null;
    renderMenu: (position: string) => ReactElement | null;
    render(): ReactElement;
}
export {};
