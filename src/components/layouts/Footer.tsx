import * as React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"© "}
      <Link color="inherit" href="https://www.asianamericandream.org/">
        The Asian American Dream, Inc.
      </Link>{" "}
      {"All rights reserved."}
    </Typography>
  );
}

export default function Footer() {
  const linkedinLink = "https://www.linkedin.com/company/asianamericandream";
  const instagramLink = "https://www.instagram.com/the_asianamericandream/";

  return (
    <footer className="relative z-[1201] mt-auto bg-white py-10">
      <div className="flex flex-row justify-center px-4">
        <div className="flex flex-col items-center">
          <div className="flex flex-row justify-center pb-2">
            <IconButton
              aria-label="email"
              href="mailto:info@asianamericandream.org"
            >
              <EmailIcon />
            </IconButton>
            <IconButton
              aria-label="linkedin"
              href={linkedinLink}
              target="_blank"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              aria-label="instagram"
              href={instagramLink}
              target="_blank"
            >
              <InstagramIcon />
            </IconButton>
          </div>
          <p className="mb-1 text-base text-gray-600">
            {"AAD is a 501(c)(3) nonprofit organization"}
          </p>
          <p className="mb-4 text-base text-gray-600">
            {"Federal Tax ID: "}
            <span className="font-bold">{"87-1056467"}</span>
          </p>
          <Copyright />
        </div>
      </div>
    </footer>
  );
}
