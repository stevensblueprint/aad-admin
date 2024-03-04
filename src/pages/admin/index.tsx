import useProtectedPage from "../../utils/useProtectedPage";

export default function Admin() {
  useProtectedPage(["ADMIN"]);
  return <div>Admin Page</div>;
}
