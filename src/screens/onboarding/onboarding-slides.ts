import { ImageProps } from 'expo-image'
import { IMAGES } from '../../assets/images'

export type OnboardingSlide = {
  id: string
  title: string
  description: string
  image: ImageProps['source']
}

// Bundled image assets resolve to a numeric module id at runtime; cast past the
// mismatched `ImageSourcePropType` (react-native) vs `ImageSource` (expo-image) typings.
export const ONBOARDING_SLIDES: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Anywhere you are',
    description:
      'Sell houses easily with the help of Listenoryx and to make this line big I am writing more.',
    image: IMAGES.onboard_1 as number,
  },
  {
    id: '2',
    title: 'At anytime',
    description:
      'Sell houses easily with the help of Listenoryx and to make this line big I am writing more.',
    image: IMAGES.onboard_2 as number,
  },
  {
    id: '3',
    title: 'Book your car',
    description:
      'Sell houses easily with the help of Listenoryx and to make this line big I am writing more.',
    image: IMAGES.onboard_3 as number,
  },
]
