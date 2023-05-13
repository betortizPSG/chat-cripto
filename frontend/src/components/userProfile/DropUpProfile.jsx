import { useState } from "react";
import DarkMode from "../DarkMode";
import Logout from "../authentication/Logout";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const DropUpProfile = ({
  direction,
  themeMood,
  themeState,
  setThemeState,
  ...args
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
      <Dropdown
        {...args}
        isOpen={dropdownOpen}
        toggle={toggle}
        direction={direction}
        className="p-0"
      >
        <DropdownToggle className="btn-options">
          <img
            alt="menu toggle"
            style={{
              pointerEvents: "none",
            }}
            src="Menu_Vertical.png"
          />
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem className="dark p-0">
            <DarkMode
              themeState={themeState}
              setThemeState={setThemeState}
              themeMood={themeMood}
            />
          </DropdownItem>
          <DropdownItem className="p-0">
            <Logout themeState={themeState} />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

  );
};

export default DropUpProfile;
