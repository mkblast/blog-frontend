import { useEffect, useState } from "react";
import NavigationBar from "../Home/NavigationBar";
import { useNavigate } from "react-router-dom";
import Styles from "./index.module.css";

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
      <div className={Styles.canvas}>
        <form className={Styles.form} onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
          <div className={Styles.personal}>
            <label >
              First name
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
              Last name
              <input
                type="text"
                value={lastName}
                onChange={(e) =>
                  handleFormChange(setLastName, e.target.value)
                }
                required
              />
            </label>
          </div>

          <div className={Styles.email}>
            <label >
              Email
              <input
                type="email"
                value={email}
                onChange={(e) =>
                  handleFormChange(setEmail, e.target.value)
                }
                required
              />
            </label>
          </div>

          <div className={Styles.password}>
            <div>
              <label >
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    handleFormChange(setPassword, e.target.value);
                  }}
                  required
                />
              </label>

              <label >
                Confirm password
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    handleFormChange(setConfirmPassword, e.target.value);
                  }}
                  required
                />
              </label>

            </div>
            <div>
              {
                match === true || password.length === 0 ?
                  <p className={Styles.error}></p>
                  :
                  <p className={Styles.error}>Password Does not match</p>
              }
            </div>
          </div>
          <div>
            {
              errors.length === 0 ?
                <></>
                :
                errors.map(err => (
                  <div key={err.msg}>
                    {
                      err.path ?
                        <p className={Styles.error}>{err.path}: {err.msg}</p>
                        :
                        <p className={Styles.error}>{err.msg}</p>
                    }
                  </div>
                ))
            }
          </div>
          <button disabled={!match} className={Styles.button}>Sign Up</button>
        </form>
      </div>
    </>
  );
}

export default Signup;
