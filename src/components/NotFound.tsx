import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notFoundContainer">
      <h1>Oops! You seem to be lost.</h1>
      <p>Here are some helpful links:</p>
      <Link to="/">Users</Link>
    </div>
  );
}
