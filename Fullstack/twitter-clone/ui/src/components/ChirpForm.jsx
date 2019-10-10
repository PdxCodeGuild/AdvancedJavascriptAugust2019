import React, { useState, useGlobal } from "reactn";
import client from '../api/client';

const ChirpForm = (props) => {
  const [body, setBody] = useState("");
  const { 0: token } = useGlobal("token");

  const postChirp = async (e) => {
    e.preventDefault();

    const { data } = await client.post("/chirp", {
      body
    }, {
      headers: { Authorization: `Bearer ${token}`}
    });

    setBody("");

    if(props.onSuccess) props.onSuccess(data);
  };

  return (
    <div>
      <form onSubmit={postChirp}>
        <div>
          <input 
            type="text" 
            placeholder="What's your chirp bruh?"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </div>
        <div>
          <button>
            Post
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChirpForm;