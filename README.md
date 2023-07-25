# TV Series App

This project is a mobile application developed using React Native and TypeScript. The main purpose of the application is to list TV series using the API provided by the [TVMaze](https://www.tvmaze.com/) website. The application allows users to search for series by name and view detailed information about each series and its episodes.

### Screenshots

If you want to see what the app looks like in action, you can find screenshots in the PrintScreens folder at the root of the project. These images provide a visual representation of the app's interface and functionality.

### Features

The application includes the following mandatory features:

- **Series Listing:** The application lists all of the series contained in the TVMaze API. The listing view shows at least the name and poster image of each series.
- **Series Search:** Users can search for series by name. The search view shows at least the name and poster image of each series.
- **Series Details:** After clicking on a series, the application shows detailed information about the series, including its name, poster, airing schedule, genres, summary, and a list of episodes separated by season.
- **Episode Details:** After clicking on an episode, the application shows detailed information about the episode, including its name, number, season, summary, and image (if available).

### Installation

To install the application, download the APK file from the distribution folder and install it on your device.

### Usage

After launching the application, you will see a list of TV series. You can scroll through the list to browse the series or use the search bar at the top of the screen to search for a series by name.

When you click on a series, you will be taken to a details screen that shows more information about the series. From this screen, you can view a list of the series' episodes. Clicking on an episode will take you to a details screen for that episode.

### Future Work

While the current version of the application includes all of the mandatory features, there are several additional features that could be added in the future to enhance the application, such as:

- Allowing the user to set a PIN number to secure the application;
- Enabling fingerprint authentication for supported devices;
- Allowing the user to save a series as a favorite and browse their favorite series in alphabetical order;
- Adding a people search feature to list the name and image of a person and show details about the person and the series they have participated in.

### Conclusion

This project was a great opportunity to demonstrate my skills in React Native development and my ability to create a user-friendly application that meets a set of specified requirements. I hope you find it to be a well-organized and well-executed project.

### Libraries Used

The following libraries were used in this project:

| Library                                                                                       | Description                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [@react-navigation/drawer](https://reactnavigation.org/docs/drawer-navigator/)                | Used for implementing a drawer-based navigation system.                                                                                                                                                      |
| [@react-navigation/native](https://reactnavigation.org/)                                      | The core dependency for navigation in React Native applications.                                                                                                                                             |
| [@react-navigation/native-stack](https://reactnavigation.org/docs/native-stack-navigator/)    | Used for implementing stack-based navigation, which allows for screens to be opened on top of each other.                                                                                                    |
| [axios](https://axios-http.com/)                                                              | Used for making HTTP requests to the TVMaze API.                                                                                                                                                             |
| [immer](https://immerjs.github.io/immer/)                                                     | Used to work with immutable state in a more convenient way.                                                                                                                                                  |
| [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/)      | Provides native-driven gesture management APIs for building best possible touch-based experiences in React Native.                                                                                           |
| [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)                            | A very fast key/value storage library that is used for storing simple data.                                                                                                                                  |
| [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/)                | Provides a more comprehensive, low level abstraction for the Animated library API to be built on top of and hence allow for much greater flexibility especially when it comes to gesture based interactions. |
| [react-native-render-html](https://github.com/meliorence/react-native-render-html)            | Used for rendering HTML content in React Native components.                                                                                                                                                  |
| [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context) | Provides a flexible way to handle safe area insets in JS. This is very useful in handling view layouts that could be obstructed by system UIs (like the home indicator or the status bar).                   |
| [react-native-screens](https://github.com/software-mansion/react-native-screens)              | Provides native navigation container components that improve performance by reducing the amount of views that are rendered at any given time.                                                                |
| [react-native-svg](https://github.com/react-native-svg/react-native-svg)                      | Used for rendering SVG images in React Native.                                                                                                                                                               |
| [use-immer](https://github.com/immerjs/use-immer)                                             | A utility to use immer as a React hook for managing state.                                                                                                                                                   |

|

### API Communication and Intermediate Hook Layer

In this project, I have implemented a clean and efficient way to handle API communication and state management, inspired by the principles of Clean Architecture. The goal is to separate concerns, make the code more maintainable, and improve the efficiency of data handling.

### API Communication Layer

The API communication layer is handled by the ApiService class. This class uses the axios library to make HTTP requests to the TVMaze API. It provides methods to fetch shows, search for shows, fetch show details, fetch show episodes, and fetch episode details.

The ApiService class also implements a caching mechanism using the MMKV storage library. This mechanism stores the responses from the API in a local cache to improve performance and reduce the number of API requests. The cache is automatically invalidated after a week to ensure that the data is not too outdated.

The ApiService class also provides a method to cancel API requests. This method is used to prevent memory leaks and unnecessary state updates when a component unmounts before an API request completes.

### Intermediate Hook Layer

The intermediate hook layer is implemented using custom React hooks. These hooks use the useImmerReducer hook from the use-immer library to manage the state. They dispatch actions to the reducer function to update the state based on the results of the API requests.

The hooks also use the useEffect hook to make the API requests when the component mounts and whenever the relevant props change. They handle the lifecycle of the API requests, including starting the requests, handling the responses, and cleaning up the requests.

The hooks provide a simple and consistent API for the components to fetch data and access the state. They encapsulate the details of the state management and API communication, allowing the components to focus on rendering the UI.

### Clean Architecture Principles

This approach aligns with the principles of Clean Architecture. The ApiService class and the custom hooks form separate layers of abstraction that are independent and interchangeable. The ApiService class is responsible for the data access and API communication, while the hooks are responsible for the state management and UI logic.

This separation of concerns makes the code easier to understand, test, and maintain. It also makes it easier to change the implementation of one layer without affecting the other layers. For example, we could switch to a different API or storage library without changing the hooks or components.

Furthermore, this approach ensures that the business rules (i.e., how to fetch and manage the data) are not coupled to the external details (i.e., the API and storage library). This alignment with Clean Architecture principles makes the code more robust and flexible.
