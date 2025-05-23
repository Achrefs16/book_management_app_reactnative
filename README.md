# Book Management App (React Native / Expo)

This is a Book Management App built with React Native using Expo, React Navigation, and React Native Paper. It supports authentication, book CRUD, and persistent login.

## Features
- User registration and login
- Persistent authentication (token stored securely)
- List, add, edit, and delete books
- Logout functionality

## Setup

1. **Clone the repository**

2. **Install dependencies**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Install Expo CLI (if you don't have it):**

   ```sh
   npm install -g expo-cli
   ```

4. **Install AsyncStorage (if not already):**

   ```sh
   npx expo install @react-native-async-storage/async-storage
   ```

5. **Set your backend API URL**
   - Edit `src/services/apiConfig.js` and set `API_BASE_URL` to your backend's address (use your local IP if testing on a device).

6. **Start the app**

   ```sh
   npm start
   # or
   expo start
   ```

7. **Run on your device or emulator**
   - Use the Expo Go app (Android/iOS) or an emulator/simulator.

## Usage
- Register a new account or login with existing credentials.
- Add, edit, or delete books from the home screen.
- Use the logout button to sign out.

## Notes
- Make sure your backend server is running and accessible from your device.
- For mobile devices, use your computer's local IP address in the API URL, not `localhost`.
- The app uses Expo Router or React Navigation depending on the version.

---

For the Flutter version, see the `book_management_app/README.md` file.

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
