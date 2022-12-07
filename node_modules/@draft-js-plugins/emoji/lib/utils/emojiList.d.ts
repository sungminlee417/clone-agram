interface EmojiListObject {
    [s: string]: string[];
}
interface EmojiList {
    setPriorityList(newPriorityList: EmojiListObject): void;
    list: EmojiListObject;
}
declare const emojiList: EmojiList;
export default emojiList;
