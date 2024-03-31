import PropTypes from "prop-types";
import "./top.scss";
import { useContext } from "react";
import { GlobalContext } from "../../state/state-managment";
import { Button } from "../TopStyledComponents/Button";
import { Input } from "../TopStyledComponents/Input";
import { Select } from "../TopStyledComponents/Select";
const Top = ({ setIsModalOpen }) => {
  const { filter, search } = useContext(GlobalContext);

  return (
    <div id="top">
      <div className="top__actions">
        <Select name="filter" id="filter" onChange={filter}>
          <option value="all" defaultValue>
            All
          </option>
          <option value="React N45">React N45</option>
          <option value="Angular N32">Angular N32</option>
          <option value="Vue N17">Vue N17</option>
        </Select>
        <Input
          id="search"
          type="text"
          onChange={search}
          placeholder="Search students..."
        />
      </div>
      <Button id="add" type="button" onClick={() => setIsModalOpen(true)}>
        + Add
      </Button>
    </div>
  );
};
Top.propTypes = {
  setIsModalOpen: PropTypes.func,
};

export default Top;
