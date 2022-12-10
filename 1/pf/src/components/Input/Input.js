

const Input = ({ title, value, update }) => {
    return (
    <>
        <span>{title}</span>
        <input
        type="text"
        value={value}
        onChange={(event) => update(event.target.value)}
        style={{ width: 200, height: 40, fontSize: 20 }}
        />
    </>
    );
  }

  export default Input;