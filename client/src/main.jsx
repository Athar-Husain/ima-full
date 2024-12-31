// import React, { useState } from "react";
// import ReactDOM from "react-dom/client";
// import { StrictMode } from "react";
// import App from "./App.jsx";
// import { Provider } from "react-redux";
// import "./index.css";
// import confetti from "canvas-confetti";
// import { store } from "./redux/store.js";

// const WelcomeScreen = ({ onEnter }) => {
//   const startConfetti = () => {
//     // Grand welcome effect: Balloons + Ribbons
//     confetti({
//       particleCount: 200,
//       spread: 120,
//       origin: { y: 0.7 },
//       gravity: 1.2,
//       ticks: 200,
//       colors: ["#ff69b4", "#ff1493", "#ffd700", "#7fffd4", "#4682b4"],
//     });

//     const interval = setInterval(() => {
//       confetti({
//         particleCount: 50,
//         spread: 180,
//         startVelocity: 20,
//         origin: { x: Math.random(), y: Math.random() / 2 },
//         gravity: 1,
//         scalar: 1.2,
//       });
//     }, 300);

//     setTimeout(() => {
//       clearInterval(interval);
//       onEnter();
//     }, 3000); // Transition to the main website after 3 seconds
//   };

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         backgroundColor: "#282c34",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         flexDirection: "column",
//         zIndex: 1000,
//         color: "white",
//         fontFamily: "Arial, sans-serif",
//       }}
//       onClick={startConfetti} // Trigger confetti and transition
//     >
//       <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉 Welcome! 🎉</h1>
//       <p style={{ fontSize: "1.5rem" }}>
//         Click anywhere to enter the website with a grand celebration!
//       </p>
//     </div>
//   );
// };

// const Main = () => {
//   const [showWelcome, setShowWelcome] = useState(true);

//   return (
//     <>
//       {showWelcome ? (
//         <WelcomeScreen onEnter={() => setShowWelcome(false)} />
//       ) : (
//         // <Provider store={store}>
//         <App />
//         // </Provider>
//       )}
//     </>
//   );
// };

// const rootElement = document.getElementById("root");
// const root = ReactDOM.createRoot(rootElement);

// root.render(
//   <StrictMode>
//     <Provider store={store}>
//       <Main />
//     </Provider>
//   </StrictMode>
// );

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.jsx";
import { Provider } from "react-redux";
import "./index.css";
import confetti from "canvas-confetti";
import { store } from "./redux/store.js";

const WelcomeScreen = ({ onEnter }) => {
  const startConfetti = () => {
    // Grand welcome effect: Balloons + Ribbons
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.7 },
      gravity: 1.2,
      ticks: 200,
      colors: ["#ff69b4", "#ff1493", "#ffd700", "#7fffd4", "#4682b4"],
    });

    const interval = setInterval(() => {
      confetti({
        particleCount: 50,
        spread: 180,
        startVelocity: 20,
        origin: { x: Math.random(), y: Math.random() / 2 },
        gravity: 1,
        scalar: 1.2,
      });
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      onEnter();
    }, 3000); // Transition to the main website after 3 seconds
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#282c34",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        zIndex: 1000,
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
      onClick={startConfetti} // Trigger confetti and transition
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉 Welcome! 🎉</h1>
      <p style={{ fontSize: "1.5rem" }}>
        Click anywhere to enter the website with a grand celebration!
      </p>
    </div>
  );
};

const Main = () => {
  // const [showWelcome, setShowWelcome] = useState(true);

  // if (showWelcome) {
  //   return <WelcomeScreen onEnter={() => setShowWelcome(false)} />;
  // }

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <Main />
  </StrictMode>
);
