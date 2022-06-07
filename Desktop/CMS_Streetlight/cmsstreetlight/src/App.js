import * as React from "react";
import { Admin, Resource } from "react-admin";

import services from "./models/services/index";

import dataProvider from "./DataProvider";

// const myTheme = createTheme({
// 	palette: {
// 		primary: {
// 			// light: will be calculated from palette.primary.main,
// 			main: "#ff4400",
// 			// dark: will be calculated from palette.primary.main,
// 			// contrastText: will be calculated to contrast with palette.primary.main
// 		},
// 		secondary: {
// 			light: "#0066ff",
// 			main: "#0044ff",
// 			// dark: will be calculated from palette.secondary.main,
// 			contrastText: "#ffcc00",
// 		},
// 		// Used by `getContrastText()` to maximize the contrast between
// 		// the background and the text.
// 		contrastThreshold: 3,
// 		// Used by the functions below to shift a color's luminance by approximately
// 		// two indexes within its tonal palette.
// 		// E.g., shift from Red 500 to Red 300 or Red 700.
// 		tonalOffset: 0.2,
// 		type: "", // "dark"  - for dark mode
// 	},
// });

const App = () => (
  <Admin
    // theme={myTheme}
    dataProvider={dataProvider}
  >
    {(permissions) => [
      <Resource
        name="streetlight/get-streetlight
"
        {...services}
        options={{ label: "Services" }}
      />,
    ]}
  </Admin>
);

export default App;
