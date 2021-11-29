//! What if you had links like this on an ecommerce site.
    // <Link to="/shoes?brand=nike">Nike</Link>
    // <Link to="/shoes?brand=vans">Vans</Link>
//*That's going to be active for "/shoes?brand=nike" as well as "/shoes?brand=nike&brand=vans".
function BrandLink({ brand, ...props }) {
  let [params] = useSearchParams();
  let isActive = params.getAll("brand").includes(brand);
  return (
    <Link
      style={{ color: isActive ? "red" : "" }}
      to={`/shoes?brand=${brand}`}
      {...props}
    />
  );
}
//*Maybe you want it to be active when there's only one brand selected:
  // let brands = params.getAll("brand");
  // let isActive =
  //   brands.includes(brand) && brands.length === 1;

//*Or maybe you want the links to be additive (clicking Nike and then Vans adds both brands to the search params) 
//*instead of replacing the brand:
function BrandLink2({ brand, ...props }) {
  let [params] = useSearchParams();
  let isActive = params.getAll("brand").includes(brand);
  if (!isActive) {
    params.append("brand", brand);
  }
  return (
    <Link
      style={{ color: isActive ? "red" : "" }}
      to={`/shoes?${params.toString()}`}
      {...props}
    />
  );
}

//*Or maybe you want it to add the brand if it's not there already and remove it if it's clicked again!
function BrandLink3({ brand, ...props }) {
  let [params] = useSearchParams();
  let isActive = params.getAll("brand").includes(brand);
  if (!isActive) {
    params.append("brand", brand);
  } else {
    params = new URLSearchParams(
      Array.from(params).filter(
        ([key, value]) => key !== "brand" || value !== brand
      )
    );
  }
  return (
    <Link
      style={{ color: isActive ? "red" : "" }}
      to={`/shoes?${params.toString()}`}
      {...props}
    />
  );
}