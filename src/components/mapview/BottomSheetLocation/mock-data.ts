import { IMAGES } from "../../../assets/images";
import { Car } from "./types";

// TODO: replace with real reverse geocoding result once wired up (see handleFetchData in index.tsx)
export const DATA = {
  datasource: {
    sourcename: "openstreetmap",
    attribution: "© OpenStreetMap contributors",
    license: "Open Database License",
    url: "https://www.openstreetmap.org/copyright",
  },
  name: "Sân vận động quốc gia Mỹ Đình",
  country: "Vietnam",
  country_code: "vn",
  city: "Hà Nội",
  postcode: "12016",
  suburb: "Xuân Phong",
  street: "Đường Lê Đức Thọ",
  iso3166_2: "VN-HN",
  lon: 105.7658668,
  lat: 21.0197682,
  county: "Tu Liem",
  state: "Ha Noi",
  state_code: "HI",
  distance: 134.93307106695357,
  result_type: "amenity",
  formatted:
    "Sân vận động quốc gia Mỹ Đình, Đường Lê Đức Thọ, Xuân Phong, Hà Nội, HI 12016, Vietnam",
  address_line1: "Sân vận động quốc gia Mỹ Đình",
  address_line2: "Đường Lê Đức Thọ, Xuân Phong, Hà Nội, HI 12016, Vietnam",
  category: "public_transport.bus",
  timezone: {
    name: "Asia/Bangkok",
    offset_STD: "+07:00",
    offset_DST: "+07:00",
    offset_STD_seconds: 25200,
    offset_DST_seconds: 25200,
  },
  plus_code: "7PH72Q98+W8",
  rank: {
    importance: 0.00007283054856179167,
    popularity: 3.318732052193473,
  },
  place_id:
    "51e6c52ef603715a405934805c870f053540f00103f9011f7a15af02000000c0020192032953c3a26e2076e1baad6e20c491e1bb996e67207175e1bb916320676961204de1bbb920c490c3ac6e68e203246f70656e7374726565746d61703a76656e75653a6e6f64652f3131353237333534393131",
};

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
