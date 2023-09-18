import { TextInput, PasswordInput, Loader } from "@mantine/core";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";
import { LuHeartHandshake } from "react-icons/lu";
import { useRegisterMutation } from "../redux/api/authApi";
import { useForm } from "@mantine/form";
import registerGif from "../assets/juicy-hands-holding-gadgets-with-social-media.gif"
import Swal from "sweetalert2";

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  const nav = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await register(values);
            console.log(data);
            if (data?.success) {
              Swal.fire({
                toast: true,
                position: "top-right",
                icon: "success",
                title: "Registered Successful",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
              });
              nav("/login");
            }
          } catch (error) {
            console.log(error);
          }
        })}
        className=" w-[700px] flex flex-col gap-10 shadow-[2px_4px_6px_4px_rgb(0,0,0,0.1),2px_2px_4px_-2px_rgb(0,0,0,0.1)] p-7 rounded"
      >
        <div className="flex justify-evenly">
          <div className="flex flex-col justify-center items-center bg-cyan-400 rounded">
            <h1 className=" w-48 text-center text-lg">
              Welcome to{" "}
              <span className="text-xl text-white">CONTACT DEMO</span>
            </h1>
            <img
              className=" w-80 "
              src={registerGif}
              alt=""
            />
            <div className="flex items-center text-sm text-cyan-50">
              <p className=" mr-2">Become one of us</p>
              <LuHeartHandshake />
            </div>
          </div>

          <div className="flex flex-col gap-5 p-7">
            <h2 className=" text-cyan-900 font-medium text-2xl">
              Create an Account
            </h2>
            <div>
              <h4 className=" text-sm font-semibold">Name</h4>
              <TextInput
                size="xs"
                placeholder="Enter your Name"
                {...form.getInputProps("name")}
              />
            </div>
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
            <div>
              <h4 className=" text-sm font-semibold">Confirm Password</h4>
              <PasswordInput
                size="xs"
                placeholder="Confirm your Password"
                {...form.getInputProps("password_confirmation")}
              />
            </div>
            <div className="flex gap-3 items-center">
              <p className=" text-sm select-none text-cyan-700">
                Already have an account?
              </p>
              <Link to={"/login"}>
                <p className="cursor-pointer select-none text-cyan-400 underline text-sm">
                  Login
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
                  <span className="  mr-3">Sign up</span> <BsArrowRightCircle />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
