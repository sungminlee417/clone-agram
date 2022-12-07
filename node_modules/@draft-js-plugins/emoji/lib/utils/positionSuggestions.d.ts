import { List } from 'immutable';
import { CSSProperties } from 'react';
import { EmojiSuggestionsState } from '..';
export interface PositionSuggestionsParams {
    decoratorRect: ClientRect;
    popover: Element;
    props: Record<string, unknown>;
    state: EmojiSuggestionsState;
    filteredEmojis: List<string>;
}
export default function positionSuggestions({ decoratorRect, popover, state, filteredEmojis, }: PositionSuggestionsParams): CSSProperties;
