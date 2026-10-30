import { StyleSheet } from 'react-native'

export const PRIMARY_COLOR = '#FEC400'
export const PRIMARY_LIGHT = '#FFF1B1'

export const onboardingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
  },
  skipText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    lineHeight: 23,
    color: '#414141',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 48,
  },
  illustration: {
    width: '93%',
    height: '45%',
    marginBottom: 32,
  },
  textBlock: {
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 28,
  },
  title: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 24,
    lineHeight: 30,
    color: '#2A2A2A',
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    lineHeight: 19,
    color: '#A0A0A0',
    textAlign: 'center',
    maxWidth: 280,
  },
  footer: {
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: PRIMARY_LIGHT,
  },
  dotActive: {
    width: 20,
    backgroundColor: PRIMARY_COLOR,
  },
  nextButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonPressed: {
    opacity: 0.85,
  },
  chevronRight: {
    width: 12,
    height: 12,
    borderTopWidth: 2.5,
    borderRightWidth: 2.5,
    borderColor: '#5A5A5A',
    transform: [{ rotate: '45deg' }],
    marginLeft: -2,
  },
  goText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 20,
    letterSpacing: 0.3,
    color: '#5A5A5A',
  },
})
