import { IMAGES } from "../assets/images";
import { Car } from "../components/mapview/BottomSheetLocation/types";

export const CARS: Car[] = [
  {
    key: "1",
    name: "Eco Car",
    image: IMAGES.car,
    price: "100$",
    description: "100m (15mins away)",
    type: ["Automatic", "3 seats", "Octane"],
  },
  {
    key: "2",
    name: "Normal Car",
    image: IMAGES.car1,
    price: "150$",
    description: "200m (5mins away)",
    type: ["Automatic", "3 seats", "Octane"],
  },
  {
    key: "3",
    name: "Sport Car",
    image: IMAGES.car2,
    price: "300$",
    description: "600m (7mins away)",
    type: ["Automatic", "3 seats", "Octane"],
  },
  {
    key: "4",
    name: "Luxury Car",
    image: IMAGES.car3,
    price: "500$",
    description: "400m (10mins away)",
    type: ["Automatic", "3 seats", "Octane"],
  },
  {
    key: "5",
    name: "Normal Car",
    image: IMAGES.car1,
    price: "150$",
    description: "50m (2mins away)",
    type: ["Automatic", "3 seats", "Octane"],
  },
  {
    key: "6",
    name: "Sport Car",
    image: IMAGES.car2,
    price: "300$",
    description: "90m (12mins away)",
    type: ["Automatic", "3 seats", "Octane"],
  },
  {
    key: "7",
    name: "Luxury Car",
    image: IMAGES.car3,
    price: "500$",
    description: "120m (34mins away)",
    type: ["Automatic", "3 seats", "Octane"],
  },
];
