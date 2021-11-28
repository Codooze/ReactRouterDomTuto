import { Outlet, Link } from "react-router-dom";

//?teach React Router how to render our app at different URLs 
function App() {
  return (
    <div className="App">
      <h1>Bookkeeper!</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
       <Outlet />
    </div>
  );
}

export default App;
