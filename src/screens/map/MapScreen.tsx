import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AppMapView from "../../components/mapview/AppMapView";
import ScreenLayout from "../../components/ScreenLayout";
import { RootStackParamList } from "../../navigation/types";
import BottomSheetLocation from "./BottomSheetLocation/BottomSheetLocation";

type Props = NativeStackScreenProps<RootStackParamList, "Map">;

const MapScreen = ({ navigation, route }: Props) => {
  return (
    <ScreenLayout isUseSafeArea={false}>
      <AppMapView
        renderOverlay={({ selectedLocation, onGoToUser, onBookNow }) => (
          <BottomSheetLocation
            selectedLocation={selectedLocation}
            onGoToUser={onGoToUser}
            onCancel={navigation.goBack}
            onBookNow={onBookNow}
          />
        )}
      />
    </ScreenLayout>
  );
};

export default MapScreen;
