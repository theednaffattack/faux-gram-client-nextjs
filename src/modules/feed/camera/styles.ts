import styled, { css, keyframes, StyledComponent } from "styled-components";
import {
  space,
  borders,
  flex,
  SpaceProps,
  FlexProps,
  BordersProps,
  FlexDirectionProps,
  AlignItemsProps,
  WidthProps,
  width,
  JustifyContentProps,
  justifyContent
} from "styled-system";

const flashAnimation = keyframes`
  from {
    opacity: 0.75;
  }

  to {
    opacity: 0;
  }
`;

interface WrapperProps
  extends SpaceProps,
    BordersProps,
    FlexProps,
    FlexDirectionProps,
    AlignItemsProps,
    JustifyContentProps,
    WidthProps {}

export const Wrapper: StyledComponent<
  "div",
  any,
  WrapperProps,
  never
> = styled.div`
${space}
${borders}
${flex}
${width}
${justifyContent}
`;

interface ContainerProps extends WidthProps {
  maxWidth?: number;
  maxHeight: number;
}

export const Container = styled.div<ContainerProps>`
  background-color: #fff;
  /* border: 2px pink solid; */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${width}
  /* max-width: ${({ maxWidth }: any) => maxWidth && `${maxWidth}px`}; */
  max-height: ${({ maxHeight }: any) => maxHeight && `${maxHeight}px`};
  overflow: hidden;
`;

export const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const Video = styled.video`
  position: absolute;

  &::-webkit-media-controls-play-button {
    display: none !important;
    -webkit-appearance: none;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  /* top: 20px;
  right: 20px;
  bottom: 20px;
  left: 20px; */
  background-color: rgba(0, 0, 0, 0.3);
  /* box-shadow: 0px 0px 20px 56px rgba(0, 0, 0, 0.6);
  border: 1px solid #ffffff; */
  border-radius: 25px;
`;

interface FlashProps {
  flash: boolean;
}

export const Flash = styled.div<FlashProps>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  opacity: 0;

  ${({ flash }: any) => {
    if (flash) {
      return css`
        animation: ${flashAnimation} 750ms ease-out;
      `;
    }
  }}
`;

export const Button = styled.button`
  width: 75%;
  min-width: 100px;
  max-width: 250px;
  margin-top: 24px;
  padding: 12px 24px;
  background: silver;
`;

// INDEX STYLES

// export const GlobalStyle = createGlobalStyle`
//   * {
//     box-sizing: border-box;
//   }

//   html {
//     height: 100%;
//   }

//   body {
//     overflow-x: hidden;
//     overflow-y: auto;
//     height: 100%;
//     padding: 32px;
//     margin: 0;
//     padding: 0;
//   }

//   div#root {
//     height: 100%;
//   }
// `;

export const Root = styled.main`
  display: flex;
  flex-direction: column;
  flex-flow: column;
  flex: 1 1 auto;
  align-items: center;
  text-align: center;
  overflow-x: hidden;
  /* overflow-y: auto; */
  /* padding: 50px 0 100px; */
`;

export const Preview = styled.img`
  width: 100%;
  height: auto;
`;

export const Footer = styled.footer`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background: silver;

  button {
    margin: 0 10px;
  }
`;
