import { api } from "../../utils/api";
import { useRouter } from "next/router";

export default function ProfilePage() {
  const router = useRouter();
  const { data, error, isLoading } = api.user.getById.useQuery({
    id: router.query.id as string,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;
  return (
    <p>
      id: {data.id}, name: {data.name}, email: {data.email}, imageurl:{" "}
      {data.image}
    </p>
  );
}
