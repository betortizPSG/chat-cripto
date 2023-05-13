import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAlert } from "react-alert";
import { FaLock, FaUnlock } from "react-icons/fa";
import { useIdleTimer } from "react-idle-timer";
import { useSelector } from "react-redux";
import { Form, FormGroup } from "reactstrap";
import { io } from "socket.io-client";

const Criptografia = ({ changeShow, idleShow, show, setShow }) => {
  const { myInfo } = useSelector((state) => state.auth);
  const scrollRef = useRef();
  const alert = useAlert();

  const handleIdle = (props, idleCripto, setShow, show, alert) => {
    // cadeado aberto
    idleCripto();
    setShow(true); // fecha cadeado
  };

  const idleCripto = useCallback(() => {
    if (!show) {
      // se o cadeado estiver aberto envia a mensagem e criptografa
      idleShow(show);
      alert.show("Suas mensagens foram criptografadas por estar ausente", {
        timeout: 5 * 1000,
      });
    }
  }, [idleShow, show]);

  const { start, reset, activate, pause, resume } = useIdleTimer({
    onIdle: () => handleIdle({ myInfo }, idleCripto, setShow, alert),
    /* onPrompt: () => handlePrompt({ myInfo }, idleCripto, setShow, alert), */
    timeout: 60 * 1000, // tempo para criptografar
    /*  promptTimeout: 5 * 1000, sem o onprompt não há necessidade de utilizar*/
    events: [
      "mousemove",
      "keydown",
      "wheel",
      "DOMMouseScroll",
      "mousewheel",
      "mousedown",
      "touchstart",
      "touchmove",
      "MSPointerDown",
      "MSPointerMove",
      "visibilitychange",
    ],
    immediateEvents: [],
    debounce: 0,
    throttle: 0,
    eventsThrottle: 200,
    element: document,
    startOnMount: true,
    startManually: false,
    stopOnIdle: false,
    crossTab: false,
    name: "idle-timer",
    syncTimers: 0,
    leaderElection: false,
  });

  const alterarShow = useCallback(() => {
    if (changeShow) {
      changeShow(show);
    }
  }, [changeShow, show]);

  return (
    <div className="cripto">
      <div
        id="box-criptografar"
        style={{ textAlign: "center", marginTop: "10px" }}
      >
        <div className="">
          <h5 className="title-dark-mode"></h5>
        </div>
        <div>
          <Form>
            <FormGroup>
              <div
                className="criptografia"
                onClick={() => {
                  setTimeout(() => {
                    setShow(!show);
                    alterarShow();
                    scrollRef.current?.scrollIntoView({ behavior: "auto" });
                  }, 100);
                }}
              >
                {show ? <FaLock size={30} /> : <FaUnlock size={30} />}
              </div>
            </FormGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Criptografia;
