import { Component, ComponentType, CSSProperties, KeyboardEvent, ReactElement } from 'react';
import { DraftHandleValue, EditorState, SelectionState } from 'draft-js';
import { AriaProps } from '@draft-js-plugins/editor';
import { List } from 'immutable';
import { EmojiImageProps, EmojiPLuginCallbacks, EmojiPluginStore } from '../..';
import { PositionSuggestionsParams } from '../../utils/positionSuggestions';
import { EmojiPluginTheme } from '../../theme';
export interface EmojiSuggestionsPubParams {
    isActive?: boolean;
    focusedOptionIndex?: number;
    onClose?(): void;
    onOpen?(): void;
    onSearchChange?(change: {
        value: string;
    }): void;
}
interface EmojiSuggestionsParams extends EmojiSuggestionsPubParams {
    callbacks: EmojiPLuginCallbacks;
    ariaProps: AriaProps;
    store: EmojiPluginStore;
    shortNames: List<string>;
    positionSuggestions(arg: PositionSuggestionsParams): CSSProperties;
    theme: EmojiPluginTheme;
    emojiImage: ComponentType<EmojiImageProps>;
}
export default class EmojiSuggestions extends Component<EmojiSuggestionsParams> {
    state: {
        isActive: boolean;
        focusedOptionIndex: number;
    };
    popover?: HTMLDivElement | null;
    key: string;
    filteredEmojis?: List<string>;
    activeOffsetKey?: string;
    lastSelectionIsInsideWord?: Immutable.Iterable<string, boolean>;
    lastSearchValue?: string;
    UNSAFE_componentWillMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    onEditorStateChange: (editorState: EditorState) => EditorState;
    onSearchChange: (editorState: EditorState, selection: SelectionState) => void;
    onDownArrow: (keyboardEvent: KeyboardEvent) => void;
    onTab: (keyboardEvent: KeyboardEvent) => void;
    onUpArrow: (keyboardEvent: KeyboardEvent) => void;
    onEscape: (keyboardEvent: KeyboardEvent) => void;
    onEmojiSelect: (emoji: string) => void;
    onEmojiFocus: (index: number) => void;
    getEmojisForFilter: () => List<string>;
    commitSelection: () => DraftHandleValue;
    openDropdown: () => void;
    closeDropdown: () => void;
    render(): ReactElement | null;
}
export {};
