import { Loader, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineHome,
  AiOutlineFileDone,
} from "react-icons/ai";
import { useCreateContactMutation } from "../redux/api/contactApi";
import Cookies from "js-cookie";

const CreateContact = () => {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      job: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  const [createContact, { isLoading }] = useCreateContactMutation();
  const token = Cookies.get("token");
  const nav = useNavigate();
  return (
    <div className="flex justify-center items-center bg-transparent h-screen border">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await createContact({ token, contact: values });
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
          <div className="flex flex-col gap-5 w-96 p-7">
            <h2 className=" text-cyan-900 font-semibold text-center text-2xl">
              Create a contact
            </h2>

            <div className="flex items-center gap-2 flex-grow">
              {/* <h4 className=" text-sm font-semibold">Email</h4> */}
              <AiOutlineUser className="text-xl" />
              <TextInput
                className="flex-grow"
                placeholder="Name"
                {...form.getInputProps("name")}
              />
            </div>

            <div className="flex items-center gap-2 flex-grow">
              <AiOutlineMail className="text-xl" />
              <TextInput
                className="flex-grow"
                placeholder="Email"
                {...form.getInputProps("email")}
              />
            </div>
            <div className="flex items-center gap-2 flex-grow">
              <AiOutlinePhone className="text-xl" />
              <TextInput
                className="flex-grow"
                placeholder="Phone"
                {...form.getInputProps("phone")}
              />
            </div>
            <div className="flex items-center gap-2 flex-grow">
              <AiOutlineHome className="text-xl" />
              <TextInput
                className="flex-grow"
                placeholder="Address"
                {...form.getInputProps("address")}
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading && true}
              className=" h-10 flex items-center justify-center rounded bg-cyan-600 text-white transition hover:bg-cyan-400 hover:text-cyan-950 px-4 py-1"
            >
              {isLoading ? <Loader color="cyan" size="xs" /> : "Create"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateContact;
