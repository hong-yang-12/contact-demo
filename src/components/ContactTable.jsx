import { Loader, Table, Menu, Button, Pagination } from "@mantine/core";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from "../redux/api/contactApi";
import {
  BsTrash3,
  BsFillPersonLinesFill,
  BsPencilSquare,
  BsStar,
} from "react-icons/bs";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addContacts } from "../redux/services/contactSlice";

const ContactTable = () => {
  const token = Cookies.get("token");
  const [current_page, setCurrentPage] = useState(1);
  const { data, error, isLoading } = useGetContactQuery({
    token,
    current_page,
  });
  // console.log(data?.contacts);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // const nav = useNavigate();

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
        // onClick={() => {
        //   nav(`/user/${contact?.id}`);
        // }}
        <tr key={contact?.id}>
          <td>
            <div className="flex gap-3">
              {contact?.photo === null ? (
                <div
                  className={` w-8 h-8 flex justify-center items-center rounded-full text-background bg-placeholder p-2`}
                >
                  {contact?.name.charAt(0)}
                </div>
              ) : (
                <img
                  className="rounded-full bg-cover bg-center object-cover"
                  src={contact?.photo}
                  width={"20px"}
                  height={"20px"}
                  alt="profile-img"
                />
              )}

              <p>{contact?.name}</p>
            </div>
          </td>
          <td>{contact?.email}</td>
          <td>{contact?.phone}</td>
          <td>{contact?.address}</td>
          <td className="flex items-center gap-5">
            <BsStar className="text-para" />
            <Menu
              width={200}
              shadow="md"
              position="bottom-end"
              transitionProps={{ transition: "rotate-left", duration: 150 }}
            >
              {/* <Button variant="outline" color="cyan">
                  ...
                </Button> */}
              <Menu.Target>
                <p className="px-2 py-1 cursor-pointer select-none border border-para bg-background text-para rounded">
                  ...
                </p>
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

                <Link to={`/edit/${contact?.id}`}>
                  <Menu.Item>
                    <p className="flex items-center gap-2 text-yellow-500">
                      <BsPencilSquare />
                      Edit
                    </p>
                  </Menu.Item>
                </Link>
              </Menu.Dropdown>
            </Menu>
          </td>
        </tr>
      );
    });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <Loader color="cyan" size="xl" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        Error: {error.message}
      </div>
    );
  }
  return (
    <div className=" w-full px-5">
      <Table className="mb-28 " highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>
              <Button variant="subtle" color="cyan">
                Options
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>{row}</tbody>
      </Table>
      <Pagination
        position="center"
        value={current_page}
        onChange={handlePageChange}
        total={10}
        color="cyan"
        withEdges
      />
    </div>
  );
};

export default ContactTable;
