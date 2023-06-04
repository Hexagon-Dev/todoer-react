import { Html, Head, Main, NextScript } from 'next/document'
import Link from "next/link";
import React, { useState } from "react";

export const AppContext = React.createContext({
  editMode: false,
});

export default function Document() {
  const [app] = useState({
    editMode: false,
  });

  return (
    <Html lang="en">
      <Head />
      <body className="flex flex-col bg-indigo-950 min-h-screen">
      <div className="flex p-4 space-x-4 bg-gray-800">
        <div className="text-3xl">
          TODOER
        </div>

        <Link className="p-2 hover:bg-gray-700 duration-200 rounded" href="/">Home</Link>
      </div>
      <AppContext.Provider value={app}>
        <Main />
        <NextScript />
      </AppContext.Provider>
      </body>
    </Html>
  )
}
