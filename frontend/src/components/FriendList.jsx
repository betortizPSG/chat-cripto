import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Input from "./authentication/Input";

export default function FriendList(props) {
 const themeMood = {props}
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  }

  return (
    <>
      <div className="container-contatos">
        <div className="contato" onClick={handleShow}>
          <span className="contato-text"> 
            {props.themeMood === "dark" ?
            <img className="contato-image" alt="icone-contato" src="./contatos.png" />
            :
            <img className="contato-image" alt="icone-contato"  src="./contatosblack.png" />
          }
          <span>Contatos</span>
        </span>
        </div>

        <div className="notificacao-container">
          { props.themeMood === "dark" ?
          <img src="./notificacao.png" alt="icone-notificacao" className="notificacao" />
          : <img src="./notificacaoblack.png" alt="icone-notificacao" className="notificacao" />} 
        </div>
      </div>

      {/* TO-DO: configurar busca dos contatos */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Buscar contatos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="text-dark">Código</Form.Label>
              <Input></Input>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleClose}>
            Enviar solicitação
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
