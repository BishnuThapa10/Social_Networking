import { BellIcon, ChevronDownIcon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon, PowerIcon, UserCircleIcon } from '@heroicons/react/16/solid';
import { Avatar, Button, IconButton, Menu, MenuHandler, MenuItem, MenuList, Navbar, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import { removeUser } from '../features/user/userSlice.JS';
import { useGetProfileQuery } from '../features/profile/profileApi.js';

export default function Header() {
  const { user } = useSelector((state) => state.userSlice);
  return (
    <Navbar className="mx-auto p-1 lg:rounded-full lg:pl-6 sticky top-0 z-50 ">
      <div className=" flex items-center justify-between text-blue-gray-900">
        <div>
          <Typography
            as="a"
            className="mr-4 ml-2 cursor-pointer py-1.5 font-medium text-xs sm:text-base"
          >
            Social Networking
          </Typography>
        </div>

        <div className='flex gap-2 items-center'>
          <NavLink to="/search">
            <IconButton variant="text" color="blue-gray">
              <MagnifyingGlassIcon className="h-4 w-4" />
            </IconButton>
          </NavLink>
          <IconButton variant="text" color="blue-gray">
            <BellIcon className="h-4 w-4" />
          </IconButton>

          {user ? <ProfileMenu user={user} /> : <Button size="sm" variant="text">
            <NavLink to={'/login'}>Log In</NavLink>
          </Button>}
        </div>

      </div>

    </Navbar>

  )
}

// profile menu component

const MenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu({ user }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = MenuItems;
  const closeMenu = () => setIsMenuOpen(false);
  const dispath = useDispatch();
  const nav = useNavigate();
  const { isLoading: loadingProfile, data: profile, error: profileError } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true, // auto refetch on mount/sign-in
  });

  if (loadingProfile) return <h1>Loading...</h1>
  if (profileError) return <h1 className='text-red-500'>{profileError.data.message}</h1>

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt={profile.username ? profile.username.charAt(0).toUpperCase() : "U"}
            className=" bg-blue-gray-50 text-black text-[18px] font-medium p-0.5 flex items-center justify-center"
            src={profile.profilePicture?.url || undefined}
          />

          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
              }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {menuItems.map(({ label, icon }, key) => {
          const isLastItem = key === menuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => {
                switch (label) {
                  case "Sign Out":
                    dispath(removeUser());
                    break;
                  case "My Profile":
                    nav("/profile");
                    break;
                }
                closeMenu();
              }}
              className={`flex items-center gap-2 rounded ${isLastItem
                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                : ""
                }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
