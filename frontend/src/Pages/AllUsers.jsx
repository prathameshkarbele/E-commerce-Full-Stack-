import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";
import { MdModeEditOutline } from "react-icons/md";
import ChangeUserRole from "../Componant/ChangeUserRole";

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const [openUpdateRole, setopenUpdateRole] = useState(false);
  const [updateUserDetails, setupdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id:""
  });

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: "include",
    });
    const dataResponce = await fetchData.json();

    if (dataResponce.success) {
      setAllUser(dataResponce.data);
    }
    if (dataResponce.error) {
      setAllUser(dataResponce.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  console.log(updateUserDetails, "updateUserDetails")
  return (
    <div>
      <table className=" w-full allUserTable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser?.map((ele, idx) => {
            return (
              <tr>
                <td>{idx + 1}</td>
                <td>{ele?.name}</td>
                <td>{ele?.email}</td>
                <td>{ele?.role}</td>
                <td>{moment(ele?.createdAt).format("LL")}</td>
                <td>
                  {
                    <button
                      onClick={() => {
                        setupdateUserDetails(ele)
                         setopenUpdateRole(true);
                      }}
                      className=" bg-green-100 rounded-full p-2 cursor-pointer hover:bg-green-500 hover:text-white"
                    >
                      <MdModeEditOutline />
                    </button>
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          onclose={() => setopenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc = {fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
