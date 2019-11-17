import React from "react";
import { motion } from "framer-motion";
import { mix } from "@popmotion/popcorn";
import styled from "styled-components";

interface WordAnonymousFuncArgs {
  width: number;
}

interface ParagraphProps {
  words: number[];
}

const randomInt = (min: number, max: number) =>
  Math.round(mix(min, max, Math.random()));

const generateParagraphLength = () => randomInt(5, 20);
const generateWordLength = () => randomInt(20, 100);

// Randomly generate some paragraphs of word lengths
const paragraphs: number[][] = [...Array(3)].map(() => {
  return [...Array(generateParagraphLength())].map(generateWordLength);
});

const WordBase = styled.div`
  height: 18px;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 8px;
  margin-right: 8px;
  background: #0055ff;
  border-radius: 10px;
  display: inline-block;
`;

export const Word: React.FunctionComponent<WordAnonymousFuncArgs> = ({
  width
}) => <WordBase className="word" style={{ width }} />;

const Paragraph: React.FunctionComponent<ParagraphProps> = ({ words }) => (
  <div className="paragraph">
    {words.map((width, index) => (
      <Word key={width + "-" + index} width={width} />
    ))}
  </div>
);

export const ContentPlaceholder = () => (
  <motion.div
    variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
    transition={{ duration: 0.8 }}
    style={{
      padding: "20px",
      transformOrigin: "top center"
    }}
  >
    {paragraphs.map((words, index) => (
      <Paragraph key={words + "-" + index} words={words} />
    ))}
  </motion.div>
);
