import { SvgProps } from "react-native-svg";
import { IconName, ICONS } from "../assets/icons";

type Props = {
  name: IconName;
} & SvgProps;

const AppIcon = (props: Props) => {
  const Icon = ICONS[props.name];
  if (!Icon) return <></>;
  return <Icon {...props} />;
};

export default AppIcon;
