import { EditorState } from 'draft-js';
declare const Mode: {
    INSERT: string;
    REPLACE: string;
};
export default function addEmoji(editorState: EditorState, emojiShortName: string, mode?: string): EditorState;
export { Mode };
