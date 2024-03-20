import AvatarWrapper from "../settings/AvatarWrapper";
import { Fragment } from "react";

export type ProfileHeaderProps = {
  name: string;
  image: string;
  roleName: string;
  email: string;
  phoneNumber: string;
};

const ProfileHeader = ({
  name,
  image,
  roleName,
  email,
  phoneNumber,
}: ProfileHeaderProps) => {
  const info = [
    {
      key: "Role",
      value: roleName.charAt(0) + roleName.slice(1).toLowerCase(),
    },
    { key: "Email", value: email },
    { key: "Phone", value: phoneNumber },
  ];

  return (
    <div className="mb-5 mt-10 h-72 w-4/5 rounded-2xl bg-white">
      <div className="flex h-full flex-row items-center">
        <div className="p-8">
          <AvatarWrapper
            alt={name}
            src={image}
            sx={{ width: 200, height: 200 }}
            variant="rounded"
          />
        </div>
        <div className="flex flex-grow flex-col px-4 py-8">
          <p className="pb-2 text-center text-3xl font-bold">{name}</p>
          <div className="grid grid-cols-12 gap-2 p-2">
            {info.map((item) => {
              return (
                <Fragment key={item.key}>
                  <p className="col-span-3 text-2xl text-gray-500">
                    {item.key}:
                  </p>
                  <p className="col-span-9 text-2xl">{item.value}</p>
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
