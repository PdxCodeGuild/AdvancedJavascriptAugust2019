import React, { useGlobal, useState, useEffect } from "reactn";
import ChirpForm from '../components/ChirpForm';
import client from '../api/client';
import Chirp from "../components/Chirp";

const Home = () => {
  const { 0: token } = useGlobal("token");

  const [chirps, setChirps] = useState([]);

  const getChirps = async () => {
    const { data } = await client.get("/chirp");

    setChirps(data);
  }

  useEffect(() => {
    getChirps();
  }, []);


  const addChirp = (chirp) => {
    setChirps([
      ...chirps,
      chirp
    ])
  }

  return (
    <div>
      <h1>Home</h1>
      <h3>Add Chirp:</h3>
      <ChirpForm onSuccess={addChirp} />
      <div>
        {chirps.map((chirp) => (
          <Chirp key={chirp._id} chirp={chirp} />
        ))}
      </div>
    </div>
  )
}

export default Home;