import { useState } from "react";
import NavigationBar from "../Home/NavigationBar";
import { useNavigate } from "react-router-dom";
import Styles from "./index.module.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  async function handleSubmit() {
    try {
      const res = await fetch("https://blog-api-mkblast.glitch.me/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const json = await res.json();

      if (res.ok) {
        localStorage.setItem("token", json.token);
        return navigate("/");
      }

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
          <div className={Styles.info}>
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
            <button className={Styles.button}>Log in</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
