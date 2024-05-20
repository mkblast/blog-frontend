import NavigationBar from "./components/Home/NavigationBar";
import Posts from "./components/Home/Posts";
import Styles from "./App.module.css";

function App() {

  return (
    <>
      <NavigationBar />
      <div className={Styles.posts}>
        <Posts />
      </div>
    </>
  );
}

export default App;
