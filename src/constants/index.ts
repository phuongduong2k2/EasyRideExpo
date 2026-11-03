import { Dimensions } from "react-native";
import { IMAGES } from "../assets/images";
import { Car } from "../screens/map/BottomSheetLocation/types";

export const CARS: Car[] = [
  {
    key: "1",
    name: "Eco Car",
    image: IMAGES.car,
    price: "100$",
    description: "100m (15mins away)",
    type: ["Automatic", "3 seats", "Octane"],
    coordinates: { latitude: 21.022855, longitude: 105.769692 },
    carIcon: "car",
  },
  {
    key: "2",
    name: "Normal Car",
    image: IMAGES.car1,
    price: "150$",
    description: "200m (5mins away)",
    type: ["Automatic", "3 seats", "Octane"],
    coordinates: { latitude: 21.006977, longitude: 105.762364 },
    carIcon: "car1",
  },
  {
    key: "3",
    name: "Sport Car",
    image: IMAGES.car2,
    price: "300$",
    description: "600m (7mins away)",
    type: ["Automatic", "3 seats", "Octane"],
    coordinates: { latitude: 21.036745, longitude: 105.749587 },
    carIcon: "car2",
  },
  {
    key: "4",
    name: "Luxury Car",
    image: IMAGES.car3,
    price: "500$",
    description: "400m (10mins away)",
    type: ["Automatic", "3 seats", "Octane"],
    coordinates: { latitude: 21.055116, longitude: 105.777475 },
    carIcon: "car3",
  },
  {
    key: "5",
    name: "Normal Car",
    image: IMAGES.car1,
    price: "150$",
    description: "50m (2mins away)",
    type: ["Automatic", "3 seats", "Octane"],
    coordinates: { latitude: 21.062731, longitude: 105.797966 },
    carIcon: "car1",
  },
  {
    key: "6",
    name: "Sport Car",
    image: IMAGES.car2,
    price: "300$",
    description: "90m (12mins away)",
    type: ["Automatic", "3 seats", "Octane"],
    coordinates: { latitude: 21.016516, longitude: 105.739102 },
    carIcon: "car2",
  },
  {
    key: "7",
    name: "Luxury Car",
    image: IMAGES.car3,
    price: "500$",
    description: "120m (34mins away)",
    type: ["Automatic", "3 seats", "Octane"],
    coordinates: { latitude: 21.051639, longitude: 105.735902 },
    carIcon: "car3",
  },
];

export const DIMENTIONS = Dimensions.get("window");
