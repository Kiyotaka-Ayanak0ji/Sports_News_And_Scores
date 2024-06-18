import React, { useState } from "react";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {  Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

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
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
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
        setError(null);
        setMessage("Password changed successfully");
        console.log("Password changed successfully");
      } 
    } catch (error) {
      throw new Error("Failed to change password");
    }
  };

  return(
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
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>
            <span className="inline-block h-screen align-middle" aria-hidden="true">
                &#8203;
            </span>
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-xl font-medium leading-6 text-gray-900">
                    Profile
                </Dialog.Title>
                <hr className="mt-2 mb-2 border-gray-300" />
                <div className="mt-2">
                    <p className="text-black-500 text-md">
                        Name: {user.name}
                    </p>
                    <p className="text-black-500 text-md">
                        Email: {user.email}
                    </p>
                </div>
                <div className="mt-2">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Change Password
                    </h3>
                </div>
                <hr className="mt-2 mb-2 border-gray-300" />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-2">
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                            Current Password
                        </label>
                        <input
                            type="password"
                            id="currentPassword"
                            {...register("currentPassword", { required: true })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.currentPassword && (
                            <span className="text-red-500">This field is required</span>
                        )}
                    </div>
                    <div className="mt-2">
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            {...register("newPassword", { required: true })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        {errors.newPassword && (
                            <span className="text-red-500">This field is required</span>
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
                            className="justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                            Close
                        </button>
                    </div>

                    <div>
                        {error && <p className="text-red-500">{error}</p>}
                        {message && <p className="text-green-500">{message}</p>}
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
