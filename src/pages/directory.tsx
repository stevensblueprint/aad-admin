import { api } from "~/utils/api";
import { ToggleButton, ToggleButtonGroup, Stack } from "@mui/material";
import { type SetStateAction, useState } from "react";
import Profile from "../components/directory/Profile";

const Directory = () => {
  const [current, setCurrent] = useState<string>("mentee");

  const { data, isLoading } = api.user.getByRole.useQuery(`${current}`);

  const roles = ["Mentee", "Mentor", "Admin"];
  const toggleButtons = roles.map((role) => (
    <ToggleButton
      key={role}
      value={role.toLowerCase()}
      disabled={isLoading}
    >
      {role}
    </ToggleButton>
  ));

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-clear">
      <h1 className="mt-6 text-6xl font-bold text-aero">Directory</h1>
      <ToggleButtonGroup
        className="mb-4 mt-10"
        size="large"
        color="primary"
        exclusive
        value={current}
        onChange={(event, newRole: string | null) => {
          if (newRole !== null) setCurrent(newRole as SetStateAction<string>);
        }
        }
      >
        {toggleButtons}
      </ToggleButtonGroup>
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
