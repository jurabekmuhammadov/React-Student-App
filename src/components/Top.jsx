import PropTypes from "prop-types";
import "./top.scss";
const Top = ({ setIsModalOpen }) => {
  return (
    <div id="top">
      <h1>Student App</h1>
      <button type="button" onClick={() => setIsModalOpen(true)}>
        + New student
      </button>
    </div>
  );
};
Top.propTypes = {
  setIsModalOpen: PropTypes.func,
};

export default Top;
