import "./App.css";
import Header from "./components/Header";
import Dashboard from "./Dashboard";
import { WeatherProvider } from "./WeatherContext";

function App() {

  return (
    <>
      <div>
        <Header />
       
        <WeatherProvider>
      <Dashboard />
    </WeatherProvider>
      </div>
    </>
  );
}

export default App;
