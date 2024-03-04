import { api } from "../utils/api";
import { ToggleButton, ToggleButtonGroup, Stack } from "@mui/material";
import { type SetStateAction, useState } from "react";
import Profile from "../components/directory/Profile";

enum UserRole {
  MENTEE = "Mentee",
  MENTOR = "Mentor",
  ADMIN = "Admin",
}

const Directory = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>(UserRole.MENTEE);

  const { data, isLoading } = api.user.getByRole.useQuery({
    role: currentRole.toUpperCase(),
  });

  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-clear">
      <h1 className="mt-6 text-6xl font-bold text-aero">Directory</h1>
      <ToggleButtonGroup
        className="mb-4 mt-10"
        size="large"
        color="primary"
        exclusive
        value={currentRole}
        onChange={(event, newRole: string | null) => {
          if (newRole !== null)
            setCurrentRole(newRole as SetStateAction<UserRole>);
        }}
      >
        {Object.values(UserRole).map((role) => (
          <ToggleButton
            key={role}
            value={role.toLowerCase()}
            disabled={isLoading}
          >
            {role}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {data && (
        <Stack spacing={2}>
          {data.map((profile) => (
            <Profile profile={profile} key={profile.id} />
          ))}
        </Stack>
      )}
    </main>
  );
};

export default Directory;
