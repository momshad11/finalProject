import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user } = useAuth0();
  console.log(user);

  return <div>{user.name}</div>;
};

export default Profile;
