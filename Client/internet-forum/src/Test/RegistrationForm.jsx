import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
function RegistrationForm() {
  //
  var onRegisterClick = async (e) => {
    e.preventDefault();
    await axios({
      method: "post",
      url: "https://localhost:5001/api/account/register",
      headers: { "Content-Type": "application/json" },
      data: {
        username: e.target[0].value,
        password: e.target[1].value,
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    //
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form onSubmit={(event) => onRegisterClick(event)} style={{}}>
        <Form.Group className="mb3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Enter Username" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" placeholder="Enter Password" />
        </Form.Group>
        <Button style={{ marginTop: "4px" }} variant="primary" type="submit">
          Register User
        </Button>
      </Form>
    </div>
  );
}
export default RegistrationForm;
