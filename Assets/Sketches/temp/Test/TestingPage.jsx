import axios from "axios";
import { useState } from "react";
import DisplayApiTable from "./DisplayApiTable";
import RegistrationForm from "./RegistrationForm";
function TestingPage() {
  const [apiResponse, setApiResponse] = useState();
  //
  var getRequest = () => {
    axios
      .get("https://localhost:5001/api/users", { "Content-Type": "text/plain" })
      .then((res) => setApiResponse(res.data) & console.log(res.data));
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        <DisplayApiTable />
      </div>
      <RegistrationForm />
    </>
  );
}
export default TestingPage;
