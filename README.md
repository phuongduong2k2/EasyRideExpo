# EasyRide

EasyRide is a ride-hailing app built with Expo / React Native, inspired by apps like Grab/Uber. This repo is still in development: the map and ride-booking flow already work, while some other tabs/features are still placeholders.

## Demo

<!--
  Replace the link below with the real demo video (YouTube, Google Drive, or a GitHub-hosted asset
  link obtained by dragging the video into an issue/PR). The original .mov file should not be
  committed directly to the repo since it's too large.
-->

[![EasyRide demo](<img width="1206" height="2622" alt="image" src="https://github.com/user-attachments/assets/8af80ec2-5a68-4f58-b0c0-14dbd11b6eeb" />
)](https://drive.google.com/file/d/1w-k0JmjZGW4F6yQqOSHESXVXt73ao0hH/view?usp=drive_link)

> 🎥 Click the image above to watch the demo video (link to be updated).

## Key Features

### Onboarding & Authentication
- Onboarding screen with a 3-slide carousel, including skip/next buttons.
- Authentication screen with a "Continue with Google" button — currently it only requests location permission and moves into the app, without real Google OAuth integration yet.

### Map & Ride Booking (main flow)
- Interactive map using `react-native-maps`, showing the user's location and letting them pick a destination pin.
- Reverse geocoding (address from coordinates) and routing (drawing the route) via the Geoapify API.
- Multi-step bottom sheet (`@gorhom/bottom-sheet`): pick pickup/destination → select vehicle type → confirm → wait for driver.
- Vehicle selection from a sample vehicle list (static data, no real pricing/backend yet).
- Waiting-for-driver screen with a countdown, call/message buttons (UI only, not yet wired to any action), and trip cancellation.
- Toggle between "ride" and "delivery" modes on Home — the delivery mode doesn't have its own flow yet.

### Location Search
- The Search screen and the "recent places" list (Redux) already have the UI scaffolding in place, waiting to be connected to real search functionality (a Mapbox geocoding service is already written but not yet called from the UI).

### Bottom Navigation Tabs
- **Home**: the map/ride-booking flow described above.
- **Favourite**, **Wallet**: placeholders, not yet implemented.
- **Offer**: currently a sensor demo screen (magnetometer), not an actual offers screen yet.
- **Profile**: Stripe (Payment Sheet) payment scaffolding — the SDK is installed and a test UI is built, but the server-side payment intent creation is still temporary, so payments aren't fully functional yet.

## Tech Stack

- **Framework**: Expo + React Native
- **Navigation**: React Navigation (native stack + bottom tabs)
- **State management**: Redux Toolkit + TanStack React Query (data fetching) + React Context (ride-booking flow state)
- **Maps & location**: `react-native-maps`, `expo-location`, Geoapify (geocoding + routing)
- **Payments**: `@stripe/stripe-react-native` Stripe React Native SDK (currently in sandbox/test stage)
- **UI**: `@gorhom/bottom-sheet`, custom SVG icons, Poppins font (`@expo-google-fonts`)

## Getting Started

Install dependencies:

```bash
npm install
```

Run a development build:

```bash
npm run ios
# or
npm run android
```

Once the build finishes, start the dev server:

```bash
npm start
```

> This app uses a development build (it has native code such as `react-native-maps` and `stripe-react-native`), so it **cannot run with Expo Go**.

### Environment Variables

Create a `.env.local` file (see `.env.local.example`) with the required keys (Geoapify API key, Stripe publishable key, etc.) before running the app.

## Scripts

```bash
npm run lint      # run eslint
npx tsc --noEmit  # typecheck
```

---

Original demo assets from [lucide.dev](https://lucide.dev/)
