import { type ReactElement } from "react";
import DirectoryTable from "../../components/directory/DirectoryTable";
import AdminLayout from "../../components/layouts/AdminLayout";

const AdminDirectory = () => {
  return <DirectoryTable adminMode={true} />;
};

AdminDirectory.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminDirectory;
