import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Form, FormGroup } from "reactstrap";
import { themeSet } from "../store/actions/messengerAction";

export default function DarkMode({ themeState, setThemeState, themeMood }) {
  const dispatch = useDispatch();

  function toggleTheme() {
    setThemeState(!themeState);
    dispatch(themeSet(themeMood === "dark" ? "white" : "dark"));
  }

  return (
    <div className="tema">
      <Form>
        <FormGroup>
          <div
            className="tema-dark-switch"
            checked={themeState}
            onClick={toggleTheme}
          >
            {themeState ? <FaSun size={30} /> : <FaMoon size={30} />}
            <span className="ajuste-letra">Modo</span>
          </div>
        </FormGroup>
      </Form>
    </div>
  );
}
