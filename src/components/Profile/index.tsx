import React, { useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from 'react-toastify';

type ChangePasswordFormValues = {
  currentPassword: string;
  newPassword: string;
};


const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const [, setIsOpen] = useState(true)

  const closeModal = () => {
    setIsOpen(false)
    navigate("../")
  }
  const [, setError] = useState(false);
  const [, setMessage] = useState<string | null>("");
  
  const user = JSON.parse(localStorage.getItem("userData") || "{}");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>();
  const onSubmit: SubmitHandler<ChangePasswordFormValues> = async (data) => {
    const { currentPassword, newPassword } = data;

    try {
      const response = await fetch(`${API_ENDPOINT}/user/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      if (response.ok) {
        setError(true);
        setMessage("Password changed successfully");
        console.log("Password changed successfully");
      }
    } catch (error) {
      toast.error("Failed to change password", {
        pauseOnHover: false,
        theme: "colored",
        delay: 5000,
        progress: undefined,
        hideProgressBar: false,
        pauseOnFocusLoss: true,
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true
      });
    }
  };

  return (
    <>
      <Transition appear show={true} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              {/* <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" /> */}
            </Transition.Child>
            <div className="flex-col w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">

              <Dialog.Title
                as="h3"
                className="flex text-xl font-medium 
                  leading-6 text-stone-500 transition ease-linear"
              >
                Profile
              </Dialog.Title>

              <hr className="flex p-2 border-stone-900" />

              <div className="flex p-2 mt-2">
                <p className="flex p-2 text-black-500 text-md">
                  Name: {user.name}
                </p>
                <p className="flex p-2 text-black-500 text-md">
                  Email: {user.email}
                </p>
              </div>
              <div className="flex mt-2">
                <h3 className="flex p-2 text-lg font-medium leading-6 text-stone-500">
                  Change Password
                </h3>
              </div>

              <hr className="mt-2 mb-2 border-stone-900" />

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-2 absolute top-20 left-1/3 items-center justify-center w-1/3 h-1/3 flex rounded-none shadow-lg shadow-slate-500">
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-stone-500">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    {...register("currentPassword", { required: true })}
                    className="mt-1 block w-full px-3 py-2 border border-stone-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.currentPassword && (
                    toast.error("This field is required", {
                      pauseOnHover: false,
                      theme: "colored",
                      delay: 5000,
                      progress: undefined,
                      hideProgressBar: false,
                      pauseOnFocusLoss: true,
                      position: "top-right",
                      autoClose: 3000,
                      closeOnClick: true
                    })
                  )}
                </div>
                <div className="mt-2">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-stone-500">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    {...register("newPassword", { required: true })}
                    className="mt-1 block w-full px-3 py-2 border border-stone-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.newPassword && (
                    <span className="text-red-500">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Change Password
                  </button>
                </div>

                <div className="mt-4">
                  <button
                    onClick={closeModal}
                    className="justify-center px-4 py-2 text-sm font-semibold text-white bg-blue-500/90 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default ChangePassword;
