import useProtectedPage from "../../utils/useProtectedPage";
import AdminLayout from "../../components/layouts/AdminLayout";
import { type ReactElement } from "react";

export default function Admin() {
  useProtectedPage(["ADMIN"]);
  return (
    <div className="flex min-h-screen flex-col p-8">
      <div className="py-2 text-4xl">Admin Page</div>
      <p className="font-base py-2">Admin page stuff would go here...</p>
    </div>
  );
}

Admin.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
