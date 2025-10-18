import { BellIcon, ChevronDownIcon, PowerIcon, UserCircleIcon } from '@heroicons/react/16/solid';
import { Avatar, Button, IconButton, Menu, MenuHandler, MenuItem, MenuList, Navbar, Typography } from '@material-tailwind/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router';
import SearchInput from '../features/search/searchInput.jsx';
import { removeUser } from '../features/user/userSlice.JS';

export default function Header() {
  const { user } = useSelector((state) => state.userSlice);
  return (
    <Navbar className="mx-auto p-2 lg:rounded-full lg:pl-6 mb-2">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <div>
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Material Tailwind
        </Typography>
        </div>

        <div>
        <SearchInput />
        </div>

        <div className='flex gap-2'>
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
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
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
