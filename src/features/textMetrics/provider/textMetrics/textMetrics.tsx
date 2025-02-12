import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  ChangeEvent,
} from 'react';
import { useCheckFilters } from '../checkFilters/checkFilters';
import { TReadingTime } from '@features/textMetrics/model/types';

interface TextMetricsProviderProps {
  children: ReactNode;
}

interface ITextMetrics {
  wordCount: number;
  letterCount: number;
  sentenceCount: number;
  readingTime: TReadingTime;
  countWords: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextMetricsContext = createContext<ITextMetrics | undefined>(undefined);

export function TextMetricsProvider({ children }: TextMetricsProviderProps) {
  const { spaceChecked } = useCheckFilters();

  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);

  // Ensure the letter count is updated when the space filter is toggled
  useEffect(() => {
    setLetterCount(spaceChecked ? text.replace(/\s/g, '').length : text.length);
  }, [spaceChecked, text]);

  function countWords(e: ChangeEvent<HTMLTextAreaElement>) {
    const newText = e.target.value;
    setText(newText);

    // Count the number of letters in the text, with spaces included depending on the filter setting
    const noSpaceText = newText.replace(/\s/g, '').length;
    const withSpaceText = newText.length;
    setLetterCount(spaceChecked ? noSpaceText : withSpaceText);

    // Count the number of words in the text, splitting on whitespace
    const words = newText.split(/\s+/).filter(Boolean);
    setWordCount(words.length);

    // Split on the following: . ! ? followed by a whitespace to count the number of sentences
    const sentences = newText.split(/(?<=[.!?])\s+/).filter(Boolean);
    setSentenceCount(sentences.length);

    setReadingTime(formatReadingTime(words.length));
  }

  // Calculate the reading time based on the number of words rounded down.
  function formatReadingTime(wordCount: number) {
    // Words per minute
    const wpm = wordCount / 200;

    if (wpm === 0) return 0;
    if (wpm < 1) return 0.1;

    return Math.floor(wpm);
  }

  return (
    <TextMetricsContext.Provider
      value={{
        letterCount,
        wordCount,
        sentenceCount,
        readingTime,
        countWords,
      }}
    >
      {children}
    </TextMetricsContext.Provider>
  );
}

export function useTextMetrics() {
  const context = useContext(TextMetricsContext);

  if (!context)
    throw new Error('useTextMetrics must be used within a TextMetricsProvider');
  return context;
}
