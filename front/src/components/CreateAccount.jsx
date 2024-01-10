import styles from "./Login.module.css";

const CreateAccount = () => {
  return (
    <>
      <div className="center">
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            id="usernameInput"
          ></input>
          <label for="usernameInput">Username</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="Email address"
            id="emailInput"
          ></input>
          <label for="emailInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="Password"
            id="passwordInput"
          ></input>
          <label for="passwordInput">Password</label>
        </div>
        <div>TODO: Password requirements?</div>
      </div>
    </>
  );
};

export default CreateAccount;
