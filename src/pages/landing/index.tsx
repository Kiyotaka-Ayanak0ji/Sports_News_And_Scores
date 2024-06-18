/* eslint-disable @typescript-eslint/no-unused-vars */
import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import LiveMatch from "../../components/Matches";
import Articles from "../../components/Articles";
// const classNames = (...classes: string[]): string =>
//   classes.filter(Boolean).join(" ");

const Landing = () => {

  const auth = !!localStorage.getItem("authToken");
  let navigation = [];
  if(auth){
    navigation = [
      { name: "Profile", href: "/profile", current: false },
      { name: "Sign out", href: "/logout", current: false },
      { name : "Preferences", href: "/account/preferences", current: false}
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
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 sm:h-14 sm:w-14 mr-2"
                    src="/assets/logo.avif"
                    alt="Sports App"
                  />
                </div>
                <div className="hidden md:block">
                  {/* <div className="ml-10 flex items-baseline space-x-9">
                    {navigation.map((item) => { 
                      const isCurrent = pathname.includes(item.href)

                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            isCurrent
                              ? 'bg-slate-50 text-blue-700'
                              : 'text-slate-500 hover:text-blue-600',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={isCurrent ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                    )})}
                  </div> */}


                </div>
              </div>

              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <button
                      key={item.name}
                      className="flex items-center px-3 py-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
                    >
                      <Link to={item.href}>{item.name}</Link>
                    </button>
                  ))}


              
                </div>
              </div>
            </div>
            
          </div>

        )}


      </Disclosure>
      <LiveMatch />
      <br />
      <br />
      <Articles />

  
    </>
      );
};

      export default Landing;





