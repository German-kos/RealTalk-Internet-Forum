import Form from "react-bootstrap/Form";
function RegistrationForm() {
  return (
    <Form style={{ display: "flex", justifyContent: "center" }}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" placeholder="Enter Username" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" placeholder="Enter Password" />
      </Form.Group>
    </Form>
  );
}
export default RegistrationForm;
