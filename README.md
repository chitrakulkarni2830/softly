# Softly

Softly is a small, comforting app for taking a moment to feel encouraged. Tap the heart on the Home screen to receive a warm message, then return whenever you need another. Its quiet visual style uses a soft illustrated background, translucent panels, and gentle animation.

## Features

- A heart interaction reveals a randomly ordered collection of supportive notes.
- Notes are cycled without repeats until the collection has been shown, then shuffled for the next cycle.
- The current position in the note cycle is saved on the device with AsyncStorage, so it survives app restarts.
- A Home action returns from a note, and an optional support link opens the creator's support page.
- Home and Explore tabs are provided through Expo Router. Explore currently contains starter content.
- Runs on iOS, Android, and web through Expo.

## Getting started

### Requirements

- Node.js and npm
- Expo Go for a quick device preview, or an iOS/Android simulator or development build

### Install and run

```bash
npm ci
npm start
```

Use the options printed by Expo to open the project on a device or simulator. To launch a specific target directly:

```bash
npm run ios
npm run android
npm run web
```

## Development commands

| Command            | Description                              |
| ------------------ | ---------------------------------------- |
| `npm start`        | Start the Expo development server        |
| `npm run ios`      | Start Expo and open the iOS simulator    |
| `npm run android`  | Start Expo and open the Android emulator |
| `npm run web`      | Start the web version                    |
| `npm run lint`     | Run Expo's ESLint checks                 |
| `npx tsc --noEmit` | Type-check the TypeScript files          |

## Project structure

```text
src/
  app/             Expo Router routes and screen components
  components/      Shared interface components and tab navigation
  constants/       Theme and layout constants
  data/notes.js    The messages shown on the Home screen
  hooks/           Theme and color-scheme hooks
assets/images/     App artwork, icons, and backgrounds
```

The Home route in `src/app/index.js` coordinates the intro, note selection, and message screen. `src/app/intro.js` contains the heart interaction, while `src/app/message.js` displays the selected note. The note list and its order are managed in `src/data/notes.js`.

## Customize the notes

Add, edit, or remove strings in `src/data/notes.js`. The app shuffles the available messages and stores the cycle and next position locally. If the collection changes, an incompatible saved cycle is discarded automatically.

## Built with

- [Expo SDK 57](https://docs.expo.dev/versions/v57.0.0/)
- [React Native](https://reactnative.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- AsyncStorage for local note-cycle persistence
