import React, { useState, useEffect } from "react";
import moment from "moment";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import { getTheme } from "../../store/actions/messengerAction";
import axios from "axios";

export default function BuscaMsg({ currentfriend }) {
  const { myInfo } = useSelector((state) => state.auth);
  const { themeMood } = useSelector((state) => state.messenger);

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setSearchText("");
    setMessages([]);
  };

  const [messages, setMessages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [allmessages, setAllMessages] = useState([]);

  useEffect(() => {
    const filteredMessages = allmessages.filter((m) =>
      m.message.text.toLowerCase().includes(searchText.toLowerCase())
    );
    setMessages(filteredMessages);
  }, [searchText, allmessages]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}api/messenger/busca-mensagem/?reseverId=${myInfo.id}&senderId=${currentfriend._id}`
      );
      setAllMessages(response.data);
    };
    fetchData();
  }, [currentfriend, myInfo]);

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  }

  useEffect(() => {
    dispatch(getTheme());
  }, []);

  return (
    <>
      <FaSearch className="btn-busca-msg" onClick={handleShow}>
        busca
      </FaSearch>

      <Modal show={show} onHide={handleClose}>
        <div className={themeMood === "dark" ? "messenger theme" : "messenger"}>
          <Modal.Header className="modal-header" closeButton>
            <Modal.Title>Busca mensagens</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label className="modal-header">Buscar</Form.Label>
                <Form.Control
                  className="form-control"
                  type="text"
                  placeholder="Digite uma palavra para busca"
                  autoFocus
                  value={searchText}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="modal-header">Resultados...</Form.Label>
                <div className="busca-input">
                  {messages.map((m, index) => (
                    <div key={index}>
                      <div>
                        <h6
                          className="mensagem-busca"
                          dangerouslySetInnerHTML={{
                            __html: m.message.text.replace(
                              new RegExp(searchText, "i"),
                              (match) => `<mark>${match}</mark>`
                            ),
                          }}
                        ></h6>
                      </div>
                      <div>
                        <h6 className="moment">
                          Criado:
                          {moment(m.updatedAt).startOf("mini").fromNow()}
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <div className="btn-flex">
              <Button className="btn-fechar" onClick={handleClose}>
                Fechar
              </Button>
            </div>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}
