import { Avatar, Card, CardContent, Typography } from "@mui/material";
import { type Prisma, type Profile } from "@prisma/client";

interface ProfileCardProps {
  profile: Prisma.ProfileGetPayload<{
    include: {
      user: true;
    };
  }>;
}

const Profile = ({ profile }: ProfileCardProps) => {
  return (
    <Card
      className="w-[600px]"
      sx={{
        display: "flex",
        borderRadius: "16px",
        background: "aero",
        p: 2,
      }}
    >
      <Avatar
        src={profile.user.image ?? undefined}
        sx={{ width: 80, height: 80, m: 2 }}
      />
      <CardContent
        sx={{
          flex: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" color="text.primary">
          {profile.user.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {profile.user.email}
        </Typography>
        {profile.bio && (
          <Typography variant="body2" color="text.primary">
            {profile.bio}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Profile;
