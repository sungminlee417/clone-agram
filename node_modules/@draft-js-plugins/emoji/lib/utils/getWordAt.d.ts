export interface WordAtResult {
    word: string;
    begin: number;
    end: number;
}
export default function getWordAt(string: string, position: number): WordAtResult;
