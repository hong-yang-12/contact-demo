import { Input, Loader, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineHome,
  AiOutlineFileDone,
} from "react-icons/ai";
import { LuImagePlus } from "react-icons/lu";
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
      name: (value) => (value.length > 1 ? null : "name is required."),
      phone : (value) => (value.length > 1 ? null : "phone number is required."),
    },
  });
  const [createContact, { isLoading }] = useCreateContactMutation();
  const token = Cookies.get("token");
  const nav = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);

  const handleCustomImageClick = () => {
    // Trigger click on hidden file input element
    document.getElementById("imgInput").click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

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

            <div
              onClick={handleCustomImageClick}
              className="w-40 h-40 bg-cyan-300 hover:bg-cyan-500 flex justify-center items-center text-3xl rounded-full"
            >
              {selectedImage ? (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected Image"
                  className="w-36 h-36 rounded-full bg-cover bg-center"
                />
                
              ) : (
                <LuImagePlus />
              )}
              
              {/* <input type="file" id="img-input" className=" hidden" /> */}
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="imgInput"
              />
            </div>

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
