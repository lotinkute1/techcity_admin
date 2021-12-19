import "./App.css";
import Main from "./components/Main/Main";
import Nav from "./components/Nav/Nav";
import TableData from "./components/TableData/TableData";
function App() {
  return (
    <div className="container-fluid p-0">
      <div className="row gx-0">
        <Nav/>
        <Main/>
        {/* <TableData/> */}
        
      </div>
    </div>
  );
}

export default App;
