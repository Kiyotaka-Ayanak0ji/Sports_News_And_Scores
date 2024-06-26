/* eslint-disable @typescript-eslint/no-unused-vars */
import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import LiveMatch from "../../components/Matches";
import Articles from "../../components/Articles";
import { useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const Landing = () => {
  const navigation = [
    { name: "Sign in", href: "/signin", current: false },
    { name: "Sign up", href: "/signup", current: false },
  ];

  const [theme,setTheme] = useState('light');

  const toggleTheme = () => {
    if(theme == "light"){
      document.body.classList.remove("light");
      setTheme("dark");
    }
    else{
      document.body.classList.remove("dark");
      setTheme("light");
    }

    localStorage.setItem("theme",theme);
    console.log(theme);

    const saved = localStorage.getItem("theme")??"light";
    document.body.classList.add(saved); 
  }

  return (
    <>
      <Disclosure as="nav" className="flex-row bg-slate-400 border-b border-slate-200">
        {() => (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="absolute left-0 ">
                  <img
                    className="items-start mb-2 h-12 w-12 sm:h-14 sm:w-14 mr-2"
                    src="../src/assets/logo.png"
                    alt="Sports App"
                  />
                </div>
                <h2 className="absolute ml-28 left-1/3 font-bold text-3xl flex text-center">
                  Sports Center 
                </h2>

                <div className="flex absolute right-0 space-x-4 mt-2 p-3">
                  <div className="inline-flex">
                    <div onClick={toggleTheme} className="mt-1 items-end">
                      {theme === "light" ? (
                        <SunIcon className = "text-amber-400 h-8 w-8" />
                      ) : (
                        <MoonIcon className = "text-blue-500 h-8 w-8" />
                      )}
                      </div>
                    </div>
                  {navigation.map((item) => (
                    <Link 
                      key={item.name} 
                      className="mb-3 p-2 w-20 text-center bg-zinc-800 text-slate-300 hover:border-2 hover:border-cyan-200 font-semibold rounded-lg 
                      transition ease-linear hover:text-slate-400" 
                      to={item.href}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </Disclosure>
      
      <div className="flex-col items-center justify-between w-full h-full">
        
        <div className="flex-row w-11/12 items-center justify-center">
          <LiveMatch />
        </div>
        
        <div className="container flex">
          <div className="w-full items-center justify-center">
              <Articles />
          </div>
        </div>

      </div>
      
    </>
  );
};

export default Landing;

