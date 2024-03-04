import { api } from "~/utils/api";
import { Button, ButtonGroup, Stack } from "@mui/material";
import { useState } from "react";
import Profile from "../components/directory/Profile";

const Directory = () => {
  const [current, setCurrent] = useState<string>("mentee");

  const { data, isLoading } = api.user.getByRole.useQuery(`${current}`);

  const roles = ["Mentee", "Mentor", "Admin"];
  const buttons = roles.map((role) => (
    <Button
      key={role}
      disabled={isLoading}
      onClick={() => setCurrent(role.toLowerCase())}
    >
      {role}
    </Button>
  ));

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-clear">
      <h1 className="mt-6 text-6xl font-bold text-aero">Directory</h1>
      <ButtonGroup className="mb-4 mt-10" size="large" color="primary">
        {buttons}
      </ButtonGroup>
      {data && (
        <Stack spacing={2}>
          {data.map((user) => (
            <Profile data={user} key={user.id} />
          ))}
        </Stack>
      )}
    </main>
  );
};

export default Directory;
