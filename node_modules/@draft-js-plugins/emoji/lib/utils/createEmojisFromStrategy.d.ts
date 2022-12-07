export interface EmojiStrategy {
    [x: string]: {
        [x: string]: string[];
    };
}
export default function createEmojisFromStrategy(): EmojiStrategy;
