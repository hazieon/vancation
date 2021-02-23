import "./App.css";
import MapContainer from "./components/map";

function App() {
  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  return (
    <div className="page">
      <div class="nav">
        <a href="#home" className="active">
          🏠
        </a>
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
        <a href="javascript:void(0);" class="icon" onclick="myFunction()">
          <i class="fa fa-bars"></i>
        </a>
      </div>
      <div className="App">
        <h1 className="heading">Vancation</h1>
      </div>
      <MapContainer />
    </div>
  );
}

export default App;
