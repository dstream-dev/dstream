import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../../apis";
import { IOrganizationUser, UserRole } from "../../../interfaces";
import Spinner from "../../../components/Spinner";
import Modal from "../../../components/Modal";
import Close from "../../../assets/icons/Close";
import { toast } from "react-hot-toast";

function UserManagement() {
  const queryClient = useQueryClient();
  const modalRef = React.useRef<HTMLDivElement>(null);
  const { data, isLoading } = useQuery(["user_list"], () => {
    return api.organization.getOrganizationUsers();
  });
  const [showModal, setShowModal] = React.useState(false);
  const [newUser, setNewUser] = React.useState<{
    email: string;
    role: UserRole;
  }>({
    email: "",
    role: UserRole.MEMBER,
  });

  const handleAddUser = useMutation(
    () => {
      return api.organization.assignUser(newUser);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user_list"]);
        setShowModal(false);
      },
      onError: (error: {
        message: string;
        response: {
          data: {
            message: string;
          };
        };
      }) => {
        toast.error(error.response.data.message || error.message);
      },
    }
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-gray-900 text-xl">User List</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gray-900 hover:bg-gray-500 text-white text-sm py-2 px-4 rounded"
        >
          Add User
        </button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-3">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={4}
                  rowSpan={4}
                  className="flex justify-center items-center h-96"
                >
                  <Spinner />
                </td>
              </tr>
            ) : (
              <>
                {(data?.data || []).map((item: IOrganizationUser) => {
                  return (
                    <tr
                      key={item.id}
                      className="bg-white border-b hover:bg-gray-50"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {item.user.first_name} {item.user.last_name}
                      </th>
                      <td className="px-6 py-4">{item.user.email}</td>
                      <td className="px-6 py-4">{item.role}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => console.log(item.id)}
                          className="font-medium text-gray-600 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
        <Modal refNode={modalRef} onClose={() => setShowModal(false)}>
          <div ref={modalRef} className="relative w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 className="text-xl font-semibold text-gray-900">
                  Assign User
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                >
                  <Close classs="w-5 h-5" />
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-6 space-y-6">
                <ul className="mb-5 flex list-none flex-wrap pl-0 gap-3">
                  <li
                    onClick={() => {
                      setNewUser({
                        ...newUser,
                        role: UserRole.ADMIN,
                      });
                    }}
                    className={`p-2 rounded cursor-pointer ${
                      newUser.role === UserRole.ADMIN
                        ? "bg-slate-200 text-gray-900"
                        : "text-gray-500"
                    }`}
                  >
                    Admin
                  </li>
                  <li
                    onClick={() => {
                      setNewUser({
                        ...newUser,
                        role: UserRole.MEMBER,
                      });
                    }}
                    className={`p-2 rounded cursor-pointer ${
                      newUser.role === UserRole.MEMBER
                        ? "bg-slate-200 text-gray-900"
                        : "text-gray-500"
                    }`}
                  >
                    Member
                  </li>
                </ul>

                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    User Email
                  </label>
                  <input
                    type="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="User Email e.g. john@gmail.com"
                    value={newUser.email}
                    onChange={(e) => {
                      setNewUser({
                        ...newUser,
                        email: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
                <button
                  onClick={() => {
                    handleAddUser.mutate();
                  }}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Assign User
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  type="button"
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
                >
                  Cancle
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default UserManagement;
