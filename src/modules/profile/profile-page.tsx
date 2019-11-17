import React from "react";
import {
  Card,
  Flex,
  Heading,
  Image,
  Text
} from "../../components/styled-rebass";

import {
  GetAllMyImagesComponent,
  MeComponent
} from "../../components/generated/apollo-graphql";
import { FullAccordion } from "./accordion";
import AccordionSection from "./accordion-section";
import UserInfo from "./user-info";

export const SeeMyImages = (data: any) => (
  <Flex
    flexDirection="row"
    flexWrap="wrap"
    alignItems="center"
    justifyContent="center"
  >
    {data && data.data.GetAllMyImages
      ? data.data.GetAllMyImages.map((image: any, index: number) => (
          <Card
            bg="white"
            key={index}
            borderRadius="15px"
            boxShadow="0 0 16px rgba(0, 0, 0, .25)"
            width={[1, "350px", "350px"]}
            m={3}
            sx={{
              overflow: "hidden",
              padding: 1,
              borderRadius: 6,
              boxShadow: "0 0 16px rgba(0, 0, 0, .25)"
            }}
          >
            <Image src={`${image.uri}`} />
          </Card>
        ))
      : ""}
    {data && data.data.GetAllMyImages.length < 1 ? (
      <Heading>You don't have any images yet</Heading>
    ) : (
      ""
    )}
  </Flex>
);

const ProfilePage = () => (
  <MeComponent>
    {({ data: dataMe, error: errorMe, loading: loadingMe }) => {
      if (errorMe) {
        return <Flex>Error! {JSON.stringify(errorMe, null, 2)}</Flex>;
      }
      return (
        <div>
          <GetAllMyImagesComponent>
            {({ data, loading, error }) => {
              if (!data || !data.GetAllMyImages) {
                return null;
              }
              if (error) {
                return (
                  <Flex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Heading>error!!!</Heading>
                    <Text>{error.message}</Text>
                  </Flex>
                );
              }
              if (loading) {
                return (
                  <Flex
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Heading>loading...</Heading>
                  </Flex>
                );
              }

              return data && data.GetAllMyImages ? (
                <Flex flexDirection="column">
                  <Heading as="h1" fontFamily="main">
                    Profile
                  </Heading>

                  <Flex
                    alignSelf="center"
                    mt={2}
                    mb={3}
                    flexDirection="column"
                    width="350px"
                  >
                    <UserInfo
                      dataMe={dataMe}
                      errorMe={errorMe}
                      loadingMe={loadingMe}
                    />
                    <AccordionSection />
                  </Flex>

                  <FullAccordion />
                  <Heading alignSelf="center" as="h3" fontFamily="main">
                    Image Uploads
                  </Heading>
                  <SeeMyImages data={data} />
                </Flex>
              ) : null;
            }}
          </GetAllMyImagesComponent>
        </div>
      );
    }}
  </MeComponent>
);

export default ProfilePage;
