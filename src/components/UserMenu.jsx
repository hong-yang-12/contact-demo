import React from "react";
import { Menu } from "@mantine/core";
import Cookies from "js-cookie";
import { useLogoutMutation } from "../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SlLogout } from "react-icons/sl";
import { removeUser } from "../redux/services/authSlice";

const UserMenu = () => {
  const user = JSON.parse(Cookies.get("user"));
  const token = Cookies.get("token");

  const [logout] = useLogoutMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const { data } = await logout(token);
    dispatch(removeUser());
    if (data?.success) {
      nav("/login");
    }
    console.log(data);
  };

  return (
    <div>
      <Menu width={300} shadow="md">
        <Menu.Target>
          {/* <Button>Toggle menu</Button> */}
          <div className="flex items-center bg-cyan-300 px-3 py-1 rounded-full">
            <img
              src="https://img.freepik.com/free-icon/user_318-159711.jpg"
              width={"40px"}
              alt=""
            />
            <p className=" text-cyan-500 font-medium ms-2">{user?.name}</p>
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item disabled>
            <div className="flex gap-1 justify-evenly">
              <img
                width={"70px"}
                src="https://img.freepik.com/free-icon/user_318-159711.jpg"
                alt=""
              />
              <div className="flex flex-col gap-3">
                <p className=" text-cyan-500 font-medium text-xl">
                  {user?.name}
                </p>
                <p className=" text-cyan-500 font-medium text-xl">
                  {user?.email}
                </p>
              </div>
            </div>
          </Menu.Item>

          <Menu.Item target="_blank">
            <div
              className="flex items-center text-xl p-2"
              onClick={logoutHandler}
            >
              <SlLogout />
              <p className="ms-2">Log out</p>
            </div>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default UserMenu;
