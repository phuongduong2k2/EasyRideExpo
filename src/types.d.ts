declare module '*.png' {
  const value: import('expo-image').ImageSource;
  export default value;
}

declare module '*.jpg' {
  const value: import('expo-image').ImageSource;
  export default value;
}

declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}