import "./App.css";
// import Greeting from "./Components/Greeting";
import ProfileCard from "./Components/ProfileCard";

function App() {
  return (
    <div className="container my-3">
      <div className="mx-auto">
        {/* <Greeting name="Mohammed"></Greeting>
        <Greeting name="Abdullaah"></Greeting> */}
        <ProfileCard
          name="Irshad"
          designation="Frontend React Developer"
          skills={["HTML", "CSS", "JS", "React"]}
        ></ProfileCard>
      </div>
    </div>
  );
}

export default App;
