import React, { useState, useEffect, useGlobal } from "reactn";
import client from '../api/client';

const Follow = ({ userId }) => {
  const { 0: token } = useGlobal("token")
  const [following, setFollowing] = useState(false);

  const followUser = async () => {
    const { data } = await client.post(`/users/follow/${userId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setFollowing(true);
  }

  const isFollowing = async () => {
    try {
      await client.get(`/users/following/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFollowing(true);
    } catch(error) {
      setFollowing(false);
    }
  }

  useEffect(() => {
    isFollowing()
  }, []);

  return (
    <button onClick={followUser}>{(following) ? "Following" : "Follow"}</button>
  )
}

export default Follow;