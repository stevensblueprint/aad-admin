import { ReactElement } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";

const Forms = () => {
  return (
    <div>
      <h1>Forms</h1>
    </div>
  );
};

Forms.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Forms;
