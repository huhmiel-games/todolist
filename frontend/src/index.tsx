import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from "react-router-dom";
import { Header } from './components/Header';
import { Router } from './routes/Router';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Header />
        <RouterProvider router={Router} />
    </React.StrictMode>
);

// commented code keeped for future tests
// async function prepare()
// {
//     if (process.env.REACT_APP_MODE == 'dev')
//     {
//         const { worker } = await import("./mocks/browser");

//         return worker.start({ onUnhandledRequest: 'bypass' });
//     }
//     else if (process.env.REACT_APP_MODE == 'github-pages')
//     {
//         const { worker } = await import("./mocks/browser");

//         return worker.start({
//             onUnhandledRequest: 'bypass',
//             serviceWorker: {
//                 url: '/todolist/mockServiceWorker.js'
//             }
//         })
//     }
// }

// prepare().then(async () =>
// {
//     const { Router } = await import("./routes/Router");

//     const root = ReactDOM.createRoot(
//         document.getElementById('root') as HTMLElement
//     );

//     root.render(
//         <React.StrictMode>
//             <Header />
//             <RouterProvider router={Router} />
//         </React.StrictMode>
//     );
// })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
