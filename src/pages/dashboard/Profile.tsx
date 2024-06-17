import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { UserCircleIcon } from '@heroicons/react/24/outline'

type nav_type = {
  name: string;
  href: string;
}

const Profile = (props: any) => {

  const {navigation} = props;

  return (
    <div className="fixed top-24 w-52 text-right">
      <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
            <UserCircleIcon/>
        </MenuButton>

        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom end"
            className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
          >
            {navigation.map((items:nav_type) => {
              <MenuItem key={items.name}>
                  { ({active}) => (
                    <Link
                      to={items.href} 
                      className="group flex w-full items-center rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                    >
                  )}
                    {items.name}
                  </Link>
                )
              </MenuItem>
              })
            }             
          </MenuItems> 
        </Transition>
      </Menu>
    </div>
  )
}

export default Profile;