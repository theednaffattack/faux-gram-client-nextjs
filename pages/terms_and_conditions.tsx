import React from "react";
import { Card as CardBase, Heading, CardProps } from "rebass";
import styled from "styled-components";
import { maxWidth, MaxWidthProps } from "styled-system";

import { Flex } from "../src/components/styled-rebass";
import { SignUpLink } from "../src/components/sign-up-link";
import { getLayout } from "../src/modules/site-layout/layout";

type TCardProps = CardProps & MaxWidthProps;

const Card: React.FC<TCardProps> = styled(CardBase)`
  ${maxWidth}
`;

interface ITermsAndConditions {
  (): JSX.Element;

  getLayout: (page: any) => JSX.Element;

  title: string;
}

const TermsAndConditions: ITermsAndConditions = () => {
  return (
    <Flex minHeight="100vh">
      <Flex width={[1]} minHeight="100vh">
        <Flex
          mt={[0, 5, 0]}
          flexDirection="column"
          width={[1]}
          justifyContent="center"
          alignItems="center"
        >
          <Card
            mx={3}
            width={1}
            maxWidth={["350px", "350px"]}
            p={4}
            sx={{
              borderRadius: "10px",
              boxShadow: "0 2px 16px rgba(0, 0, 0, 0.25)"
            }}
            bg="rgb(242,242,242)"
          >
            <Flex mt={3} mb={4} justifyContent="center">
              <Heading color="text" fontSize={[5]} fontFamily="montserrat">
                Terms and Conditions
              </Heading>
            </Flex>
          </Card>
          <SignUpLink width="150px" />
        </Flex>
      </Flex>
    </Flex>
  );
};

TermsAndConditions.getLayout = getLayout;
TermsAndConditions.title = "Terms & Conditions";

export default TermsAndConditions;
