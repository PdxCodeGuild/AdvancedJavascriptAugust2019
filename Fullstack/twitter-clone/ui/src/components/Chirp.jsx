import React, { useState, useGlobal } from "reactn";
import client from '../api/client';
import { Link } from "react-router-dom";

const Chirp = (props) => {
  const { chirp } = props;
  const [replying, setReplying] = useState(false);
  const [replies, setReplies] = useState(chirp.replies);

  const { 0: token } = useGlobal("token");
  const [body, setBody] = useState("");

  const replyToChirp = async (e) => {
    e.preventDefault();

    const { data } = await client.post(
      `/chirp/reply/${chirp._id}`,
      { body },
      { headers: {
        Authorization: `Bearer ${token}`
      }}
    )

    setBody("");

    setReplies(data.replies);
  }

  return (
    <div>
      <div>{chirp.body}</div>
      <div>
        <Link to={`/user/${chirp.user._id}`}>
        {chirp.user.email}
        </Link>
      </div>

      {replies.map((reply) => (
        <div style={{marginLeft: "2rem"}}>
          <div>{reply.body}</div>
          <div><strong>{reply.user.email}</strong></div>
        </div>
      ))}

      <button onClick={() => setReplying(!replying)}>Reply</button>
      {replying && (
        <form onSubmit={replyToChirp}>
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
      )}
    </div>
  )
}

export default Chirp;