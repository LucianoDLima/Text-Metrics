import { useState } from 'react';

export function useTextMetric() {
  const [wordCount, setWordCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [readingTime, setReadingTime] = useState('0');

  function countWords(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value.trim();

    const words = text.split(/\s+/).filter(Boolean);
    setWordCount(words.length);

    const letters = text.replace(/\s/g, '').length;
    setLetterCount(letters);

    const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
    setSentenceCount(sentences.length);

    setReadingTime(formatReadingTime(words.length));
  }

  // Calculate reading time based on 200 words per minute
  function formatReadingTime(wordCount: number) {
    const wpm = wordCount / 50;

    if (wpm === 0) {
      return '0';
    } else if (wpm < 1) {
      return '<1';
    } else if (wpm >= 1 && wpm < 2) {
      return '1';
    } else {
      return Math.floor(wpm).toString();
    }
  }

  return { wordCount, letterCount, sentenceCount, readingTime, countWords };
}
