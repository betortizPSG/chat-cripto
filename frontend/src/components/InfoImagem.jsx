import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { FcInfo } from "react-icons/fc";
import Tooltip from "react-bootstrap/Tooltip";

function InfoImagem() {
  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip>
            <strong>Extensões suportadas:</strong> PNG, JPEG, GIF
            <hr />
            <strong>Tamanho máximo:</strong> 1 MBs.
          </Tooltip>
        }
      >
        <Button className="Button">
          <FcInfo className="icon" />
        </Button>
      </OverlayTrigger>
    </>
  );
}

export default InfoImagem;
