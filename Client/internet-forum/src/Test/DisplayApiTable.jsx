import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./DisplayApiTable.css";
//
function DisplayApiTable() {
  const [tableContents, setTableContents] = useState();
  //
  useEffect(() => {
    axios
      .get("https://localhost:5001/api/users", { "Content-Type": "text/plain" })
      .then(
        (response) =>
          setTableContents(response.data) & console.log(response.data)
      );
  }, []);
  //
  var displayPartially = (str) => {
    //shorten the displayed string to 7 characters
    if (str === null) {
      return "None";
    }
    str = str.slice(0, 6);
    return str + " ...";
  };
  //
  var refreshTable = () => {
    axios
      .get("https://localhost:5001/api/users", { "Content-Type": "text/plain" })
      .then(
        (response) =>
          setTableContents(response.data) & console.log(response.data)
      );
  };
  //
  return (
    <div>
      <h1>Users Data (Get)</h1>
      <Button onClick={() => refreshTable()} variant="primary" size="lg">
        Refresh Table
      </Button>
      {tableContents !== undefined ? (
        <Table
          style={{ textAlign: "center" }}
          striped
          bordered
          hover
          variant="dark"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Password Hash</th>
              <th>Password Salt</th>
            </tr>
          </thead>
          <tbody>
            {tableContents.map((row, i) => {
              return (
                <tr key={i}>
                  <th>{row.id}</th>
                  <th>{row.userName}</th>
                  <th title={row.passwordHash}>
                    {displayPartially(row.passwordHash)}
                  </th>
                  <th title={row.passwordSalt}>
                    {displayPartially(row.passwordSalt)}
                  </th>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <div>Fetching Data...</div>
      )}
    </div>
  );
}
export default DisplayApiTable;
