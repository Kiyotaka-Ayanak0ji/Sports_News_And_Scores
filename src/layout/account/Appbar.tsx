import { Fragment, useState, useContext, useEffect } from "react";
import { Disclosure, Menu, Transition} from "@headlessui/react";
import { UserCircleIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
const Logo = "../../assets/logo.png";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/theme";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import Articles from "../../components/Articles";
import LiveMatch from "../../components/Matches";
import Favourites from "../../components/Articles/Favourites";
import React from "react";

const intial = [{ name: "Sign out", href: "/logout" }];

export const isAuth = localStorage.getItem("authToken")??"";

const Navbar:React.FC = () => {

  const [userNavigation, setUserNavigation] = useState(intial);

  const { theme, setTheme } = useContext(ThemeContext);

  const [enabled, setEnabled] = useState(theme === "dark");

  const toggleTheme = () => {
    
    let newTheme = "";

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

  useEffect(() => {
    if (isAuth !== "") {
      setUserNavigation([
        { name: "Sign in", href: "/signin" },
        { name: "Sign up", href: "/signup" },
      ]);
    } else {
      setUserNavigation([
        { name: "Sign out", href: "/logout" },
        { name: "Change Password", href: "/account/profile" },
      ]);
    }
  }, []);

  return (
    <>
      <Disclosure
        as="nav"
        className="border-b bg-gray-200 border-gray-200 dark:bg-gray-800"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-row items-center">
              <img
                className="h-14 w-16"
                src={Logo}
                alt="Sports Center"
              />
            </div>
            <div>
              <h1 className="text-center font-bold text-2xl text-stone-800 dark:text-white">
                Sports Center
              </h1>
            </div>
            <div className="flex items-end">
              <div onClick={toggleTheme} className="mr-3">
                {theme === "dark" ? (
                  <SunIcon className="text-amber-400 h-8 w-8" />
                ) : (
                  <MoonIcon className="text-blue-500 h-8 w-8" />
                )}
              </div>
              {isAuth && (
                <Link to={"/account/preferences"}>
                  <Cog6ToothIcon
                    className="h-8 w-6"
                    aria-hidden="true"
                  />
                </Link>
              )}
              <div className="hidden md:block">
                <div className="ml-1 flex items-center md:ml-2">
                  <Menu as="div" className="relative ml-1">
                    <div>
                      <Menu.Button className="rounded-full bg-white p-1 text-gray-400 hover:text-blue-600">
                        <UserCircleIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </Menu.Button>
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
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item: any) => (
                          <Menu.Item key={item.name}>
                              <Link
                                to={item.href}
                                className={"block px-4 py-2 text-sm text-gray-700"
                                }
                              >
                                {item.name}
                              </Link>
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Disclosure>
      {/* Main */}
      <div 
        className="mx-auto w-full h-full items-center justify-between 
        flex bg-gray-400 rounded-none">
          <LiveMatch/>
          <div className="container flex w-full h-auto items-center justify-center">
            <Articles/>
            <Favourites/>
          </div>
      </div>
    </>
  );
};

export default Navbar;
