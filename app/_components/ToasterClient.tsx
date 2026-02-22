"use client";

import { Toaster } from "react-hot-toast";

export function ToasterClient() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3600,
        style: {
          background: "rgba(224,176,255)",
          color: "rgb(15, 23, 42)",
          border: "1px solid rgba(216,191,216,0.35)",
          boxShadow:
            "0 0 0 1px rgba(216,191,216,0.18), 0 12px 44px rgba(216,191,216,0.22)",
          backdropFilter: "blur(16px)",
          borderRadius: "18px",
          padding: "14px 14px",
          maxWidth: "420px",
        },
      }}
    />
  );
}
