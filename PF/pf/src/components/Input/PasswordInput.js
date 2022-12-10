

const PasswordInput = ({ title, value, update }) => {
    return (
    <>
        <span>{title}</span>
        <input
        type="password"
        value={value}
        onChange={(event) => update(event.target.value)}
        style={{ width: 200, height: 40, fontSize: 20 }}
        />
    </>
    );
  }

  export default PasswordInput;