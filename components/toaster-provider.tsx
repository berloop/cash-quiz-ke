"use client";

import { Toaster } from "react-hot-toast";

export const ToasterProvider = () => {
    const toastOptions = {
        style: {
            // Customize the toast container styles
            background: "#121212",
            color: "#fff",
        },
    };

    return <Toaster toastOptions={toastOptions} />;
};
