import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const handleEdit = () => {};
  const handleRemove = (e,index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser))
  };
  return (
    <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
          Name : {user?.name ? user.name : "Guest User"}
        </h1>
        <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
          Email Address : {user?.email ? user.email : "example.com"}
        </h3>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <p className="mt-0.5 text-sm text-gray-500">Your Addresses:</p>

        {user.addresses.map((address, index) => (
          <div
            key={address.pinCode}
            className="flex justify-between px-5 gap-x-6 py-5 border-solid border-2 border-gray-200"
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm/6 font-semibold text-gray-900">
                  {address.name}
                </p>
                <p className="mt-1 truncate text-xs/5 text-gray-500">
                  {address.street}
                </p>
                <p className="mt-1 truncate text-xs/5 text-gray-500">
                  {address.pinCode}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm/6 text-gray-900">Phone: {address.phone}</p>
              <p className="text-sm/6 text-gray-500">{address.city}</p>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <button
                onClick={(e) => handleEdit(e, index)}
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Edit
              </button>
              <button
                onClick={(e) => handleRemove(e, index)}
                type="button"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
