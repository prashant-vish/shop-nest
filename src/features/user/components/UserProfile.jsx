import React from "react";

import { useDispatch, useSelector } from "react-redux";

const UserProfile = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  return (
    <div>
      <div></div>
    </div>
  );
};

export default UserProfile;
