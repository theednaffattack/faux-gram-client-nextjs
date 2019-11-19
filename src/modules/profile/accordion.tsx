import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import DropZoneContainer from "./dropzone-container";
import {
  AddProfilePictureComponent,
  SignS3Component,
  MeComponent
} from "../../components/generated/apollo-graphql";

interface AccordionProps {
  i: number;
  expanded: false | number;
  setExpanded: any;
}

const Accordion: React.FunctionComponent<AccordionProps> = ({
  i,
  expanded,
  setExpanded
}) => {
  const isOpen = i === expanded;

  // By using `AnimatePresence` to mount and unmount the contents, we can animate
  // them in and out while also only rendering the contents of open accordions
  return (
    <>
      <motion.header
        initial={false}
        animate={{ backgroundColor: isOpen ? "#FF0088" : "#0055FF" }}
        onClick={() => setExpanded(isOpen ? false : i)}
        style={{
          background: "#0055ff",
          borderRadius: "10px",
          color: "white",
          cursor: "pointer",
          height: "40px",
          marginBottom: "20px"
        }}
      />
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <MeComponent>
              {({ data: dataMe, error: errorMe, loading: loadingMe }) => {
                return (
                  <SignS3Component>
                    {(
                      signS3,
                      {
                        data: dataSignS3,
                        error: errorSignS3,
                        loading: loadingSignS3
                      }
                    ) => {
                      return (
                        <AddProfilePictureComponent>
                          {(
                            addProfilePicture,
                            // @ts-ignore
                            {
                              data: dataAddProfilePicture,
                              error: errorAddProfilePicture,
                              loading: loadingAddProfilePicture
                            }
                          ) => {
                            return (
                              <DropZoneContainer
                                dataMe={dataMe}
                                errorMe={errorMe}
                                loadingMe={loadingMe}
                                mutateSignS3={signS3}
                                dataSignS3={dataSignS3}
                                errorSignS3={errorSignS3}
                                loadingSignS3={loadingSignS3}
                                mutateAddProfilePicture={addProfilePicture}
                                dataAddProfilePicture={dataAddProfilePicture}
                                errorAddProfilePicture={errorAddProfilePicture}
                                loadingAddProfilePicture={
                                  loadingAddProfilePicture
                                }
                              />
                            );
                          }}
                        </AddProfilePictureComponent>
                      );
                    }}
                  </SignS3Component>
                );
              }}
            </MeComponent>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export const FullAccordion = () => {
  // This approach is if you only want max one section open at a time. If you want multiple
  // sections to potentially be open simultaneously, they can all be given their own `useState`.
  const [expanded, setExpanded] = useState<false | number>(0);

  return (
    <>
      {accordionIds.map((item, i) => {
        return (
          <Accordion
            key={item + i}
            i={i}
            expanded={expanded}
            setExpanded={setExpanded}
          />
        );
      })}
    </>
  );
};

const accordionIds = ["upload_1", "upload_2"];
