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

<<<<<<< HEAD
>>>>>>> refs/rewritten/onto
=======
>>>>>>> 9ac344e (rebase from main)
>>>>>>> c9c0b7f (rebase from main)
  export default Input;