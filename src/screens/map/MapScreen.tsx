import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AppMapView from "../../components/mapview/AppMapView";
import ScreenLayout from "../../components/ScreenLayout";
import { RootStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "Map">;

const MapScreen = ({ navigation, route }: Props) => {
  return (
    <ScreenLayout isUseSafeArea={false}>
      <AppMapView isViewOnly={false} />
    </ScreenLayout>
  );
};

export default MapScreen;
