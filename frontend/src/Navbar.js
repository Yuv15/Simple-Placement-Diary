import React, { useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

function Navbar() {
  const [dark, setDark] = useState(false);

  const toggleDarkMode = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };
<h1 className="text-xl font-bold">
    P<span className="styled-suffix">log</span>
</h1>
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md fixed w-full top-0">
      <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">
        P-log
      </h1>
      <div className="flex items-center gap-4">
        <a href="https://www.linkedin.com/in/yuvraj-kaushik/" target="_blank" rel="noreferrer"
           className="text-gray-600 dark:text-gray-300 hover:text-blue-500">LinkedIn</a>
        <a href="https://github.com/Yuv15" target="_blank" rel="noreferrer"
           className="text-gray-600 dark:text-gray-300 hover:text-gray-400">GitHub</a>
        <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
          {dark ? <SunIcon className="h-5 w-5 text-yellow-400" /> : <MoonIcon className="h-5 w-5 text-gray-800" />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
