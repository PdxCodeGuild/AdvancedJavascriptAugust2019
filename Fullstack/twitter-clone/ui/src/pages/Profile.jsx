import React, { useState, useEffect, useGlobal } from "reactn";
import client from "../api/client";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { 0: token } = useGlobal("token");

  useEffect(() => {
    const getProfile = async () => {
      const { data } = await client.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProfile(data);
    }

    getProfile();
  }, [token]);

  return (
    <div>
      <h1>Profile:</h1>
      {profile && (
        <em>{profile.email}</em>
      )}
    </div>
  )
}

export default Profile;