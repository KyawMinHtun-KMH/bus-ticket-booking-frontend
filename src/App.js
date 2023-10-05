import { Route, Routes } from "react-router-dom";
import AllTickets from "./components/pages/AllTickets";


function App() {
  return (
    <Routes>
      <Route path="/" element={<AllTickets />}></Route>
    </Routes>
  );
}

export default App;
