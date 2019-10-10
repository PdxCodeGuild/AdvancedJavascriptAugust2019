import React, { useState, useEffect } from "reactn";
import client from '../api/client';
import Chirp from "../components/Chirp";
import { useParams } from "react-router-dom";

const User = () => {
  const [profile, setProfile] = useState(null);
  const { userId } = useParams();

  const getProfile = async () => {
    const { data } = await client.get("/users/profile/" + userId);
    setProfile(data);
  }

  useEffect(() => {
    getProfile();
  }, []);

  if(profile) {
    return (
      <div>
        <h2>
          {profile.email}
        </h2>
        <div>
          {profile.chirps.map((chirp) => (
            <Chirp key={chirp._id} chirp={chirp} />
          ))}
        </div>
      </div>
    );
  } else {
    return <em>Loading...</em>
  }
};

export default User;