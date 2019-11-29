import React from "react";
import { loremIpsum } from "lorem-ipsum";
import { motion } from "framer-motion";

// const sampleWords = loremIpsum({
//   units: "paragraphs",
//   count: 6,
//   sentenceLowerBound: 5, // Min. number of words per sentence.
//   sentenceUpperBound: 15 // Max. number of words per sentence.
// });

const sampleWords = loremIpsum({
  units: "words",
  count: 6
  // sentenceLowerBound: 5, // Min. number of words per sentence.
  // sentenceUpperBound: 15 // Max. number of words per sentence.
});

const LoremComponent = () => {
  return <div>{sampleWords}</div>;
};

export const ContentPlaceholder = React.memo(() => {
  // const inverted = useInvertedScale();
  return (
    <motion.div
      className="content-container"
      // style={{ ...inverted, originY: 0, originX: 0 }}
    >
      {/* <LoremIpsum p={6} avgWordsPerSentence={6} avgSentencesPerParagraph={4} /> */}
      <LoremComponent />
    </motion.div>
  );
});
