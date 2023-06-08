import { Loader, Table, Input, Menu, Button, rem } from "@mantine/core";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from "../redux/api/contactApi";
import { BsTrash3, BsFillPersonLinesFill, BsThreeDots } from "react-icons/bs";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addContacts, setSearchTerm } from "../redux/services/contactSlice";

const ContactTable = () => {
  const token = Cookies.get("token");
  const { data, isLoading } = useGetContactQuery(token);
  console.log(data?.contacts?.data);

  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contactSlice.contacts);
  const searchTerm = useSelector((state) => state.contactSlice.searchTerm);

  const [deleteContact] = useDeleteContactMutation();
  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        const data = await deleteContact({ id, token });
        console.log(data);
      }
    });
  };

  useEffect(() => {
    dispatch(addContacts(data?.contacts?.data));
  }, [data]);

  const row = contacts
    ?.filter((item) => {
      if (searchTerm === "") {
        return item;
      } else if (
        item?.name.toLowerCase().includes(searchTerm?.toLocaleLowerCase())
      ) {
        return item;
      }
    })
    ?.map((contact) => {
      return (
        <tr key={contact?.id}>
          <td>
            <div className="flex gap-1">
              <img
                className="rounded-full bg-cover bg-center"
                src={
                  data?.contact?.photo === null
                    ? "https://cdn-icons-png.flaticon.com/512/21/21104.png"
                    : data?.contact?.photo
                }
                width={"30px"}
                height={"30px"}
                alt=""
              />
              <p>{contact?.name}</p>
            </div>
          </td>
          <td>{contact?.email}</td>
          <td>{contact?.phone}</td>
          <td>{contact?.address}</td>
          <td>
            <Menu
              width={200}
              shadow="md"
              position="bottom-end"
              transitionProps={{ transition: "rotate-left", duration: 150 }}
            >
              <Menu.Target>
                <Button variant="outline" color="cyan">
                  ...
                </Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item>
                  <p
                    onClick={() => deleteHandler(contact?.id)}
                    className=" cursor-pointer text-red-500 flex items-center gap-2"
                  >
                    <BsTrash3 /> Delete
                  </p>
                </Menu.Item>

                <Link to={`/user/${contact?.id}`}>
                  <Menu.Item>
                    <p className="flex items-center gap-2 text-cyan-500">
                      <BsFillPersonLinesFill />
                      User Info
                    </p>
                  </Menu.Item>
                </Link>
              </Menu.Dropdown>
            </Menu>
          </td>
        </tr>
      );
    });

  const showUserInfo = (arg) => {};

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader color="cyan" size="xl" />
      </div>
    );
  }
  return (
    <div className=" w-[660px]">
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>
              <Button variant="subtle" color="cyan">
                <BsThreeDots />
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>{row}</tbody>
      </Table>
    </div>
  );
};

export default ContactTable;
