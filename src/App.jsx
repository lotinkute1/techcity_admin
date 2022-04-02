import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./components/Main/Main";
import Nav from "./components/Nav/Nav";
import OrdersPage from "./features/OrdersPage/Orderspage";
import AdminPage from "./features/AdminPage/AdminPage";
function App() {
  return (
    <div className="container-fluid p-0">
      <div className="row gx-0">
        <Nav />
        <Routes>
          <Route path="/:id/*" element={<Main />} />
          {/* <Route path="/" element={<AdminPage />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
