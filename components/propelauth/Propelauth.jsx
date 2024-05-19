// import { createClient } from "@propelauth/javascript";

// const authClient = createClient({
//     // The base URL where your authentication pages are hosted. You can find this under the Frontend Integration section for your project.
//     authUrl: "https://auth.yourdomain.com",
//     // If true, periodically refresh the access token in the background. This helps ensure you always have a valid token ready to go. Default true.
//     enableBackgroundTokenRefresh: true,
// });

// authClient.redirectToLoginPage

// // import React from 'react';
// // import { AuthProvider } from '@propelauth/react';
// // import { BrowserRouter } from 'react-router-dom';
// // import ReactDOM from 'react-dom/client';
// // import Home from '../../app';

// // const Propelauth = () => {
// //   const root = ReactDOM.createRoot(document.getElementById('root'));
// //   root.render(
// //     <React.StrictMode>
// //       <AuthProvider authUrl={'https://822084642.propelauthtest.com/'}>
// //         <BrowserRouter>
// //           <Home />
// //         </BrowserRouter>
// //       </AuthProvider>
// //     </React.StrictMode>
// //   );
// // };

// // export default Propelauth;

import React from 'react';
import { AuthProvider } from '@propelauth/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../app'; // Adjust the path as needed

const Stack = createNativeStackNavigator();

const Propelauth = () => {
  return (
    <AuthProvider authUrl={'https://822084642.propelauthtest.com/'}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default Propelauth;