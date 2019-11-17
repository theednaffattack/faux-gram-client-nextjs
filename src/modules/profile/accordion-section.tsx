import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ContentPlaceholder } from "./content-placeholder";
import { Button } from "../../components/styled-rebass";

interface AccordionSectionProps {
  expanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
}

let transitionOpts = {
  duration: 0.8,
  ease: [0.04, 0.62, 0.23, 0.98]
};

const AccordionSection: React.FunctionComponent<AccordionSectionProps> = ({
  expanded,
  setExpanded
}) => {
  let isOpen = expanded;
  return (
    <>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="stuff"
            initial="collapsed"
            animate={isOpen ? "open" : "collapsed"}
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: {
                opacity: 0,
                height: 0
              }
            }}
            transition={transitionOpts}
          >
            <ContentPlaceholder />
          </motion.section>
        )}
      </AnimatePresence>

      <Button
        type="button"
        variant="outline"
        onClick={() => setExpanded(!isOpen)}
      >
        edit profile
      </Button>
    </>
  );
};

interface IAccordionContainerProps {}

const AccordionContainer: React.FunctionComponent<
  IAccordionContainerProps
> = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return <AccordionSection expanded={expanded} setExpanded={setExpanded} />;
};

export default AccordionContainer;
