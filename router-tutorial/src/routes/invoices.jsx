import { Link, NavLink, Outlet,useLocation, useSearchParams } from "react-router-dom";
import { getInvoices } from "../data";

export default function Invoices() {
  let invoices = getInvoices();
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div style={{ display: "flex" }}>
      <nav
        style={{
          borderRight: "solid 1px",
          padding: "1rem",
        }}
      >
        <input
          value={searchParams.get("filter") || ""}
          onChange={event => {
            let filter = event.target.value;
            if (filter) {
              setSearchParams({ filter });
            } else {
              setSearchParams({});
            }
          }}
        />
        {invoices
          .filter(invoice => {
            let filter = searchParams.get("filter");
            if (!filter) return true;
            let name = invoice.name.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((invoice) => (
          <QueryNavLink
            style={({ isActive }) => {
              return {
                display: "block",
                margin: "1rem 0",
                color: isActive ? "red" : "",
              };
            }}
            to={`/invoices/${invoice.number}`}
            key={invoice.number}
          >
            {invoice.name}
          </QueryNavLink >
        ))}
      </nav>
      <Outlet />
    </div>
  );
}

function QueryNavLink({ to, ...props }) {
  let location = useLocation();
  return <NavLink to={to + location.search} {...props} />;
}


//- active links Link vs NavLink https://reactrouter.com/docs/en/v6/getting-started/tutorial#active-links
//It's very common, especially in navigation lists, to display the link as the active link the user is looking at. 
//Let's add this treatment to our invoices list by swapping out Link for NavLink.


/*
normal string
<NavLink className="red" />

function
<NavLink className={({ isActive }) => isActive ? "red" : "blue"} />

-Search params https://reactrouter.com/docs/en/v6/getting-started/tutorial#search-params
*/
