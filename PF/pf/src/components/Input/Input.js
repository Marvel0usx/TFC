<<<<<<< HEAD


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

=======


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

>>>>>>> refs/rewritten/onto
  export default Input;