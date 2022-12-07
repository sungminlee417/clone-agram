import { ReactElement, ReactNode } from 'react';
import { EmojiPluginStore } from '../../index';
export interface EmojiSuggestionsPortalParams {
    store: EmojiPluginStore;
    offsetKey: string;
    children: ReactNode;
}
export default function EmojiSuggestionsPortal({ children, store, offsetKey, }: EmojiSuggestionsPortalParams): ReactElement;
