import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  lines: string[];
  typingSpeed?: number; // ms per char
  lineDelay?: number;   // ms before next line starts
  className?: string;
  lineClassName?: string;
  onComplete?: () => void;
  startImmediately?: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  lines,
  typingSpeed = 35,
  lineDelay = 400,
  className = '',
  lineClassName = '',
  onComplete,
  startImmediately = true,
}) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>(['']);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!startImmediately) return;

    if (currentLineIndex >= lines.length) {
      setIsFinished(true);
      onComplete?.();
      return;
    }

    const targetLine = lines[currentLineIndex];

    if (currentCharIndex < targetLine.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => {
          const next = [...prev];
          next[currentLineIndex] = targetLine.substring(0, currentCharIndex + 1);
          return next;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    } else {
      // Completed current line, pause before next line
      const delayTimer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
        setDisplayedLines(prev => [...prev, '']);
      }, lineDelay);

      return () => clearTimeout(delayTimer);
    }
  }, [currentLineIndex, currentCharIndex, lines, typingSpeed, lineDelay, startImmediately, onComplete]);

  return (
    <div className={`space-y-3 ${className}`}>
      {displayedLines.map((line, index) => {
        const isCurrentActiveLine = index === currentLineIndex && !isFinished;
        return (
          <p key={index} className={`relative leading-relaxed ${lineClassName}`}>
            <span>{line}</span>
            {isCurrentActiveLine && (
              <span className="inline-block w-1.5 h-4 ml-1 bg-rose-400 animate-pulse align-middle" />
            )}
          </p>
        );
      })}
    </div>
  );
};
