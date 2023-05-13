import React, { useState } from "react";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import Placeholder from "react-bootstrap/Placeholder";

function Forgot() {
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    // Enviar email para o servidor
    // Exibir mensagem de sucesso
  }

  return (
    <div className="forgot-container">
      <Card>
        <CardBody>
          <div className="card-forgot">ESQUECI MINHA SENHA</div>
          <Form onSubmit={handleSubmit}>
            <FormGroup className="forgot-formgroup">
              <input
                className="forgot-input"
                type="email"
                id="email"
                value={email}
                placeholder="Digite seu e-mail"
                onChange={(event) => setEmail(event.target.value)}
              ></input>
            </FormGroup>
            <Button className="forgot-button" type="submit">
              Enviar
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}

export default Forgot;
