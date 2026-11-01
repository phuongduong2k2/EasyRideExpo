import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AppMapView from "../../components/mapview/AppMapView";
import ScreenLayout from "../../components/ScreenLayout";
import { MapProvider } from "../../context/mapContext";
import { RootStackParamList } from "../../navigation/types";
import BottomSheetLocation from "./BottomSheetLocation/BottomSheetLocation";

type Props = NativeStackScreenProps<RootStackParamList, "Map">;

const MapScreen = ({ navigation, route }: Props) => {
  return (
    <ScreenLayout isUseSafeArea={false}>
      <MapProvider>
        <AppMapView
          renderOverlay={({
            selectedLocation,
            onGoToUser,
            fetchRouting,
            fetchDriverRouting,
          }) => (
            <BottomSheetLocation
              selectedLocation={selectedLocation}
              onGoToUser={onGoToUser}
              onCancel={navigation.goBack}
              onBookDriver={fetchRouting}
              onStart={fetchDriverRouting}
            />
          )}
        />
      </MapProvider>
    </ScreenLayout>
  );
};

export default MapScreen;
