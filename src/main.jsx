import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./globals.css";



ReactDOM.createRoot(document.getElementById('root')).render(<App />)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register({
    onUpdate: (registration) => {
        alert("New content is available. Please refresh the page.")
    },
    onSuccess: (registration) => {
        console.log("Content is cahced for offline use.")
    }
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistration().then(registration => {
        if (registration) {
            console.log('Service worker is running');
        } else {
            console.log('Service worker is not running');
        }
    });
} else {
    console.log('Service workers are not supported')
}
