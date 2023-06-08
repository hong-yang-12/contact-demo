import { TextInput, PasswordInput, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowLeftCircle, BsPersonCheckFill } from "react-icons/bs";
import { LuHeartHandshake } from "react-icons/lu";
import { FaRegSmileBeam } from "react-icons/fa";
import { useLoginMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/services/authSlice";

const Login = () => {
  const [login, { isLoading, isLoadingDone }] = useLoginMutation();
  const form = useForm({
    initialValues: {
      email: "admin@gmail.com",
      password: "admin123",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length > 7 ? null : "Password must has 8 or more characters"),
    },
  });
  const dispatch = useDispatch();
  const nav = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await login(values);
            dispatch(addUser({ user: data?.user, token: data?.token }));
            console.log(data);
            if (data?.success) {
              nav("/");
            }
          } catch (error) {
            console.log(error);
          }
        })}
        className=" w-[700px] flex flex-col gap-10 shadow-[2px_4px_6px_4px_rgb(0,0,0,0.1),2px_2px_4px_-2px_rgb(0,0,0,0.1)] p-7 rounded"
      >
        <div className="flex justify-evenly">
          <div className="flex flex-col gap-5 p-7">
            <h2 className=" text-cyan-900 font-medium text-2xl">Log In</h2>

            <div>
              <h4 className=" text-sm font-semibold">Email</h4>
              <TextInput
                size="xs"
                placeholder="Enter your Email"
                {...form.getInputProps("email")}
              />
            </div>
            <div>
              <h4 className="  text-sm font-semibold">Password</h4>
              <PasswordInput
                size="xs"
                placeholder="Enter your Password"
                {...form.getInputProps("password")}
              />
            </div>

            <div className="flex justify-end w-60 gap-3 items-center text-xs">
              <Link to={"/notfound"}>
                <p className="cursor-pointer select-none text-cyan-400 underline">
                  Recover your password?
                </p>
              </Link>
            </div>
            <button
              type="submit"
              disabled={isLoading && true}
              className=" h-10 flex items-center justify-center rounded bg-cyan-600 text-white transition hover:bg-cyan-400 hover:text-cyan-950 px-4 py-1"
            >
              {isLoading ? (
                <Loader color="cyan" size="xs" />
              ) : (
                <>
                  {<BsArrowLeftCircle className=" me-2" />} Sign in{" "}
                  {isLoadingDone && <BsPersonCheckFill className="ms-2" />}
                </>
              )}
            </button>
            <div className="flex justify-between gap-3 items-center">
              <p className=" text-sm select-none text-cyan-700">
                Not a member?
              </p>
              <Link to={"/register"}>
                <p className="cursor-pointer select-none text-cyan-400 underline text-sm">
                  Register Now
                </p>
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-evenly items-center bg-cyan-400 p-7 rounded">
            <div>
              <h1 className=" flex items-center justify-center w-56 text-center text-2xl text-white">
                <span className=" mr-2 font-bold">Hello Again !!! </span>{" "}
                <FaRegSmileBeam />
              </h1>
              <div className="flex items-center text-sm text-cyan-50">
                <p className=" mr-2">Welcome back, you've been missed</p>
                <LuHeartHandshake />
              </div>
            </div>

            <img
              className=" w-80 "
              src="src\assets\florid-remote-workflow.gif"
              alt=""
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
