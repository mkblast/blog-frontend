import { useEffect, useState } from "react";
import NavigationBar from "../Home/NavigationBar";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [match, setMatch] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (password !== confirmPassword || password.length === 0) {
      return setMatch(false);
    }

    return setMatch(true);

  }, [confirmPassword, password]);

  async function handleSubmit() {
    try {
      const res = await fetch("https://blog-api-mkblast.glitch.me/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        }),
      });

      if (res.ok) {
        return navigate("/login");
      }

      const json = await res.json();

      setErrors(json.errors);
    } catch (err) {
      console.log(err);
    }
  }

  function handleFormChange(updateFun, value) {
    return updateFun(value);
  }

  return (
    <>
      <NavigationBar />
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
          <label >
            First name:
            <input
              type="text"
              value={firstName}
              onChange={(e) =>
                handleFormChange(setFirstName, e.target.value)
              }
              required
            />
          </label>

          <label >
            Last name:
            <input
              type="text"
              value={lastName}
              onChange={(e) =>
                handleFormChange(setLastName, e.target.value)
              }
              required
            />
          </label>

          <label >
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) =>
                handleFormChange(setEmail, e.target.value)
              }
              required
            />
          </label>

          <label >
            Password:
            <input
              type="text"
              value={password}
              onChange={(e) => {
                handleFormChange(setPassword, e.target.value);
              }}
              required
            />
          </label>

          <label >
            Confirm password:
            <input
              type="text"
              value={confirmPassword}
              onChange={(e) => {
                handleFormChange(setConfirmPassword, e.target.value);
              }}
              required
            />
          </label>
          {
            match === true || password.length === 0 ?
              <></>
              :
              <p>Password not match</p>
          }
          {
            errors.length === 0 ?
              <></>
              :
              errors.map(err => (
                <div key={err.msg}>
                  <p>{err.msg}</p>
                </div>
              ))
          }
          <button disabled={!match}>submit</button>
        </form>
      </div>
    </>
  );
}

export default Signup;
