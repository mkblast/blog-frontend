import { Link } from "react-router-dom";
import Styles from "./NavigationBar.module.css";

function NavigationBar() {

  return (
    <nav className={Styles.bar}>
      <Link to={"/"} className={Styles.link}><h1 className={Styles.header}>BLOG</h1></Link>

      <ul className={Styles.nav}>
        <li><Link to={"/write"} className={Styles.link}>Write</Link></li>
        <>
          {localStorage.getItem("token") ?
            <li><Link to={"/logout"} className={Styles.link}>Log Out</Link></li>
            :
            <>
              <li><Link to={"/login"} className={Styles.link}>Log In</Link></li>
              <li><Link to={"/signup"} className={Styles.link}>Sign Up</Link></li>
            </>
          }
        </>
        <li><Link to={"/about"} className={Styles.link}>About</Link></li>
      </ul>
    </nav >
  );
}

export default NavigationBar;
