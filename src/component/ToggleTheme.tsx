import "./ToggleTheme.css"

type ToggleProps = {
  handleChange: () => void;
  isChecked: boolean;
};

const Toggle = ({ handleChange, isChecked }: ToggleProps) => {
  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id="toggle"
        className="toggle"
        onChange={handleChange}
        checked={isChecked}
      />
      <label htmlFor="toggle">
        {"turn " + (isChecked ? "light" : "dark") + " mode"}
      </label>
    </div>
  );
};

export default Toggle;
