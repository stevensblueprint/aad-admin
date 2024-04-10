import { api } from "../../utils/api";
import DefaultLoadingPage from "../../components/loading/loading";
import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import { Alert, AlertTitle, Button } from "@mui/material";
import MatchingFormSteps from "../../components/matching/MatchingFormSteps";

type Preference = {
  name: string;
  id: number;
  firstLetter: string;
};

const MatchingPage = () => {
  const { data: sessionData } = useSession();
  const [submitted, setSubmitted] = useState(false);
  const [preferences, setPreferences] = useState<Preference[]>([]);

  const otherRole =
    sessionData?.user?.roleName === "MENTEE" ? "MENTOR" : "MENTEE";

  // if mentee, query all mentors and vice versa
  const {
    data: allMatches,
    error,
    isLoading,
  } = api.user.getByRole.useQuery({ role: otherRole });
  if (isLoading) return <DefaultLoadingPage />;
  if (error)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-midnight-sky to-aero">
        <h1 className="p-4 font-sans text-3xl text-white">
          Please Sign In to view this page
        </h1>
        <Button variant="outlined" onClick={() => void signIn()}>
          Sign In
        </Button>
      </div>
    );
  const menteeOrMentorText =
    sessionData?.user?.roleName === "MENTEE" ? "mentors" : "mentees";

  const preferenceOptions = allMatches.map((match) => {
    const firstLetter = match?.user.name ? match?.user.name.charAt(0) : "N";
    return {
      name: match?.user.name ? match?.user.name : "No Name",
      id: match?.id,
      firstLetter: /[a-zA-Z]/.test(firstLetter) ? firstLetter : "#",
    };
  });

  return (
    <div className="flex flex-col px-4 py-6 md:px-32">
      <h1 className="text-center text-2xl md:text-6xl">Matching</h1>
      <Alert
        severity="info"
        icon={false}
        sx={{ marginTop: 2, marginBottom: 4, borderRadius: 2, fontSize: 16 }}
      >
        <AlertTitle>
          <strong>Instructions</strong>
        </AlertTitle>
        This matching form will consist of 2 steps! <br />
        <div className="ml-4">
          <strong>1.</strong> Select your top 5 {menteeOrMentorText} from the
          provided list
          <br />
          <strong>2.</strong> Rearrange your top 5 in order of preference
          <br />
        </div>
        <em>
          Note: If you need to update your preferences, you can do so by
          resubmitting the form.
        </em>
      </Alert>
      {/* Can show 'already completed' alert to users who submitted form will depend on databse implementation */}
      {/* {submitted && (
				<Alert severity="warning" onClose={() => {}}>
					We noticed you submitted your preferences already. Any new submission will replace the previous one.
				</Alert>
			)} */}
      <MatchingFormSteps
        menteeOrMentorText={menteeOrMentorText}
        preferenceOptions={preferenceOptions}
        preferences={preferences}
        setPreferences={setPreferences}
        setSubmitted={setSubmitted}
      />
      {submitted && (
        <div className="my-4 px-10 md:px-20">
          <Alert severity="success">Your submission has been received!</Alert>
        </div>
      )}
    </div>
  );
};

export default MatchingPage;
