import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  ChangeEvent,
} from 'react';
import { useCheckFilters } from '../checkFilters/checkFilters';

interface ILetterCount {
  letters: number;
  excludeSpace: boolean;
}

interface ITextMetrics {
  wordCount: number;
  letterCount: ILetterCount;
  sentenceCount: number;
  readingTime: string;
  countWords: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

interface TextMetricsProviderProps {
  children: ReactNode;
}

const TextMetricsContext = createContext<ITextMetrics | undefined>(undefined);

export function TextMetricsProvider({ children }: TextMetricsProviderProps) {
  const { spaceChecked } = useCheckFilters();

  const [text, setText] = useState('');
  const [readingTime, setReadingTime] = useState('0');
  const [wordCount, setWordCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [letterCount, setLetterCount] = useState<ILetterCount>({
    letters: 0,
    excludeSpace: spaceChecked,
  });

  // Ensure the letter count is updated when the space filter is toggled
  useEffect(() => {
    setLetterCount((prev) => ({
      ...prev,
      letters: spaceChecked ? text.replace(/\s/g, '').length : text.length,
    }));
  }, [spaceChecked, text]);

  function countWords(e: ChangeEvent<HTMLTextAreaElement>) {
    const newText = e.target.value;
    setText(newText);

    // Count the number of letters in the text. If the space filter is enabled, exclude spaces
    setLetterCount((prev) => ({
      ...prev,
      letters: spaceChecked
        ? newText.replace(/\s/g, '').length
        : newText.length,
    }));

    const words = newText.split(/\s+/).filter(Boolean);
    setWordCount(words.length);

    console.log(letterCount.letters);

    // Split on the following: . ! ? followed by a whitespace
    const sentences = newText.split(/(?<=[.!?])\s+/).filter(Boolean);
    setSentenceCount(sentences.length);

    setReadingTime(formatReadingTime(words.length));
  }

  // Calculate the reading time based on the number of words (wpm = words per minute)
  function formatReadingTime(wordCount: number) {
    const wpm = wordCount / 200;

    if (wpm === 0) return '0';
    if (wpm < 1) return '<1';

    return Math.floor(wpm).toString();
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

// eslint-disable-next-line react-refresh/only-export-components
export function useTextMetrics() {
  const context = useContext(TextMetricsContext);

  if (!context)
    throw new Error('useTextMetrics must be used within a TextMetricsProvider');
  return context;
}
