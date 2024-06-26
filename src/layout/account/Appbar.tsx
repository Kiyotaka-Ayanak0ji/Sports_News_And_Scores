/* eslint-disable @typescript-eslint/no-unused-vars */
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import LiveMatch from "../../components/Matches";
import Articles from "../../components/Articles";
import { Fragment, useContext, useState } from "react";
import { ThemeContext } from "../../context/theme";
import { SunIcon, MoonIcon, Cog6ToothIcon, UserCircleIcon } from "@heroicons/react/24/outline";

const Appbar = () => {
  const auth = !!localStorage.getItem("authToken");
  let navigation = [];

  const { theme, setTheme } = useContext(ThemeContext);

  const [enabled, setEnabled] = useState(theme === "light");

  const toggleTheme = () => {
    
    let newTheme = localStorage.getItem('theme')??'light';

    if (theme === "light") {
      newTheme = "dark";
      document.body.classList.add("dark");
    } else {
      newTheme = "light";
      document.body.classList.remove("dark");
    }
    setEnabled(!enabled);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };


  if(auth){
    navigation = [
      { name: "Profile", href: "/account/profile", current: false },
      { name: "Sign out", href: "/logout", current: false },
    ];
  }else{
    navigation = [
      { name: "Sign in", href: "/signin", current: false },
      { name: "Sign up", href: "/signup", current: false },
    ];
  }

  return (
    <>
      <Disclosure as="nav" className="border-b border-slate-200">
        {() => (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                
                <div className="flex-col">
                  <div className="flex-shrink-0 absolute left-0">
                    <img
                      className="h-14 w-14 mb-20"
                      src="../src/assets/logo.png"
                      alt="Sport"
                    />
                  </div>
                </div>

                <div className="flex item-end gap-1">
                  <div onClick={toggleTheme} className="px-2">
                    {theme === "light" ? (
                      <SunIcon className = "text-amber-400 h-8 w-8" />
                    ) : (
                      <MoonIcon className = "text-blue-500 h-8 w-8" />
                    )}
                  </div>
                  {auth && (
                    <Link to={"/account/preferences"}>
                      <Cog6ToothIcon
                        color={theme === "dark"?"white":"black"}
                        className="h-8 w-6"
                        aria-hidden="true"
                      />
                    </Link>
                  )}
                  <div className="flex items-baseline space-x-4">
                    <Menu as="div" className="relative ml-1">
                      <div>
                        <MenuButton className="rounded-full bg-white p-1 text-gray-400 hover:text-blue-600">
                          <UserCircleIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </MenuButton>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {navigation.map((item: any) => (
                        <MenuItem key={item.name}>
                          <Link
                            to={item.href}
                            className={"w-full block px-4 py-2 text-center text-sm text-gray-700"
                            }
                          >
                            {item.name}
                          </Link>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Transition>
                </Menu>             
              </div>
            </div>
          </div>         
        </div>
      )}

      </Disclosure>

      <div className="flex-col gap-2 w-full h-full">
        <div className="flex w-full h-1/3">
          <LiveMatch />
        </div>
        <hr className="mt-40 h-2 inline-flex w-full bg-stone-800" />
        <div className="">
          <Articles />
        </div>
      </div> 
    </>
  );
};

export default Appbar;
