import { ComponentType, CSSProperties, KeyboardEvent, ReactNode } from 'react';
import { EditorPlugin, EditorCommand } from '@draft-js-plugins/editor';
import { Map } from 'immutable';
import { DraftHandleValue, EditorState } from 'draft-js';
import { EmojiSuggestionsPubParams } from './components/EmojiSuggestions';
import { EmojiSelectPubParams } from './components/EmojiSelect';
import { PositionSuggestionsParams } from './utils/positionSuggestions';
import { defaultTheme } from './theme';
import type { EmojiPluginTheme } from './theme';
import Group from './components/EmojiSelect/Popover/Groups/Group';
export { defaultTheme };
export type { EmojiPluginTheme };
export interface EmojiImageProps {
    emoji: string;
    theme: EmojiPluginTheme;
    unicode: string;
}
export interface EmojiInlineTextProps {
    theme: EmojiPluginTheme;
    decoratedText: string;
    children: ReactNode;
    className?: string;
}
export interface EmojiSuggestionsState {
    isActive?: boolean;
    focusedOptionIndex: number;
}
export interface EmojiSelectGroup {
    title: string;
    icon: ReactNode;
    categories: string[];
    instance?: Group | null;
    top?: number;
    topList?: number;
}
export interface EmojiPLuginCallbacks {
    keyBindingFn?(event: KeyboardEvent): EditorCommand | null | undefined;
    handleKeyCommand: undefined;
    handleReturn?(event: KeyboardEvent): DraftHandleValue;
    onChange?(editorState: EditorState): EditorState;
}
export interface EmojiPluginConfig {
    theme?: EmojiPluginTheme;
    positionSuggestions?: (arg: PositionSuggestionsParams) => CSSProperties;
    priorityList?: {
        [k: string]: string[];
    };
    selectGroups?: EmojiSelectGroup[];
    selectButtonContent?: ReactNode;
    toneSelectOpenDelay?: number;
    useNativeArt?: boolean;
    emojiImage?: ComponentType<EmojiImageProps>;
    emojiInlineText?: ComponentType<EmojiInlineTextProps>;
    disableInlineEmojis?: boolean;
}
interface GetClientRectFn {
    (): ClientRect | undefined;
}
export interface EmojiPluginStore {
    getEditorState?(): EditorState;
    setEditorState?(state: EditorState): void;
    getPortalClientRect(offsetKey: string): ClientRect | undefined;
    getAllSearches(): Map<string, string>;
    isEscaped(offsetKey: string): boolean;
    escapeSearch(offsetKey: string): void;
    resetEscapedSearch(): void;
    register(offsetKey: string): void;
    updatePortalClientRect(offsetKey: string, func: GetClientRectFn): void;
    unregister(offsetKey: string): void;
}
export declare type EmojiPlugin = EditorPlugin & {
    EmojiSuggestions: ComponentType<EmojiSuggestionsPubParams>;
    EmojiSelect: ComponentType<EmojiSelectPubParams>;
};
declare const _default: (config?: EmojiPluginConfig) => EmojiPlugin;
export default _default;
