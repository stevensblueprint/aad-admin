import React from "react";
import { Avatar } from "@mui/material";
import { type Profile, Prisma } from "@prisma/client";

export type profileProps = Prisma.ProfileGetPayload<{
  include: {
    user: true;
  };
}>;

const Profile = ({ data }: { data: profileProps }) => {
  return (
    <div className="flex w-[600px] gap-4 rounded-lg bg-aero p-4">
      <Avatar src={data.user.image} sx={{ width: 80, height: 80 }} />
      <div className="flex-1 text-white">
        <p>{data.user.name}</p>
        <p>{data.user.email}</p>
        {data.bio && <p>data.bio</p>}
      </div>
    </div>
  );
};

export default Profile;
