import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Form, FormGroup, Input, Label } from "reactstrap";

const HoverMessage = ({ state, setCheckboxHover, checkboxHover, setState }) => {
  return (
    <>
      <div className="hover">
        <Form>
          <FormGroup switch>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id="hover-tooltip">
                  {state ? "Hover Habilitado" : "Hover Desabilitado"}
                </Tooltip>
              }
            >
              <Input
                className="botao"
                type="switch"
                checked={state}
                onChange={() => {
                  setCheckboxHover(!checkboxHover);
                  setState(!checkboxHover);
                }}
              />
            </OverlayTrigger>
            <Label check></Label>
          </FormGroup>
        </Form>
      </div>
    </>
  );
};

export default HoverMessage;
