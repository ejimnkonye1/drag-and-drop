// // App.js
// import React, { useEffect, useState } from 'react';
// import { auth } from './Firebase';
// import LoginPage from './Components/Login';

// import ImageGallery from './Components/ImageGallery';

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((authUser) => {
//       if (authUser) {
//         // User is logged in
//         setUser(authUser);
//       } else {
//         // User is logged out
//         setUser(null);
//       }
//     });

//     return () => {
//       // Unsubscribe from the Firebase observer when the component unmounts
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <div>
    
//       <LoginPage />
//       {user ? (
//         <ImageGallery /> // Render the gallery if the user is authenticated
//       ) : (
//         <LoginPage /> // Render the login page if the user is not authenticated
//       )}
      
//     </div>
//   );
// }

// export default App;
import React from "react";
import LoginPage from "./Components/Login";
import ImageGallery from "./Components/ImageGallery";
import imageArray from "./Components/img";
import './App.css'


function App () {
  return (
    <div>
     <ImageGallery />
    </div>
  )

}

export default App;