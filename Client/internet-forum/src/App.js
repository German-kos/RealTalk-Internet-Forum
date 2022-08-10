import "./App.css";
import React from "react";
import { useState } from "react";
import axios from "axios";

function App() {
  const [apiResponse, setApiResponse] = useState();
  //
  var getRequest = () => {
    axios
      .get("https://localhost:5001/api/users", { "Content-Type": "text/plain" })
      .then((res) => setApiResponse(res.data) & console.log(res.data));
  };
  return (
    <div className="App">
      <h1>API Request and Response Example</h1>
      <button onClick={() => getRequest()}>Get Request</button>

      {apiResponse !== undefined
        ? apiResponse?.map((user, i) => {
            return (
              <div key={i}>
                {user.id}, {user.userName}, {user.password}
              </div>
            );
          })
        : "None"}
    </div>
  );
}

export default App;
