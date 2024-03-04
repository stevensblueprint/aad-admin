import React from "react";
import { Avatar } from "@mui/material";
import { type Profile, type Prisma } from "@prisma/client";

interface ProfileCardProps {
  profile: Prisma.ProfileGetPayload<{
    include: {
      user: true;
    };
  }>;
}

const Profile = ({ profile }: ProfileCardProps) => {
  return (
    <div className="flex w-[600px] gap-4 rounded-lg bg-aero p-4">
      <Avatar src={profile.user.image} sx={{ width: 80, height: 80 }} />
      <div className="flex-1 text-white">
        <p>{profile.user.name}</p>
        <p>{profile.user.email}</p>
        {profile.bio && <p>{profile.bio}</p>}
      </div>
    </div>
  );
};

export default Profile;
