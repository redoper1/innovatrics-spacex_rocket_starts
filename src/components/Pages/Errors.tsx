import { Link } from "react-router-dom";

export function Error404() {
  return (
    <div className="error-page 404">
      <h1>404 - Not Found!</h1>
      <Link to="/">Go back to the list</Link>
    </div>
  );
}
