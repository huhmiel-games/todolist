import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from "react-router-dom";
import { Header } from './components/Header';

async function prepare()
{
    if (process.env.REACT_APP_MODE !== 'dev') return;

    const { worker } = await import("./mocks/browser");

    return worker.start();
}

prepare().then(async () =>
{
    const { Router } = await import("./routes/Router");

    const root = ReactDOM.createRoot(
        document.getElementById('root') as HTMLElement
    );

    root.render(
        <React.StrictMode>
            <Header />
            <RouterProvider router={Router} />
        </React.StrictMode>
    );
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
