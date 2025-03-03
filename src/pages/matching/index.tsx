import { Alert, AlertTitle } from "@mui/material";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import PleaseSignInPage from "../../components/PleaseSignInPage";
import DefaultLoadingPage from "../../components/loading/loading";
import MatchingFormSteps, {
  type Preference,
} from "../../components/matching/MatchingFormSteps";
import { api, type RouterOutputs } from "../../utils/api";

export type getByRoleOutput = RouterOutputs["user"]["getByRole"];
export type getByRoleOutputData = getByRoleOutput[0];

const formatOptionsObject = ({ name, id }: getByRoleOutputData): Preference => {
  const firstLetter = name ? name.charAt(0) : "N";
  return {
    name: name ? name : "No Name",
    id,
    firstLetter: /[a-zA-Z]/.test(firstLetter) ? firstLetter : "#",
  };
};

const MatchingPage = () => {
  const { data: sessionData } = useSession({ required: true });
  const [submitted, setSubmitted] = useState(false);

  const otherRole =
    sessionData?.user?.roleName === "MENTEE" ? "MENTOR" : "MENTEE";

  // The mutation function from user api to update a user's preferences
  const mutation = api.user.updatePreferences.useMutation();

  const onSubmit = (preferences: Preference[]) => {
    // Add your form submission logic here (e.g., API call)
    // Creating array of just the preference ids before calling the mutate
    const preferenceIds = preferences.map((preference) => preference.id);
    mutation.mutate({ preferences: preferenceIds });
    console.log("Final preferences order:", preferences);
    setSubmitted(true);
  };

  // if mentee, query all mentors and vice versa
  const {
    data: allMatches,
    error,
    isLoading,
  } = api.user.getByRole.useQuery({ role: otherRole });

  const preferenceOptions = useMemo(() => {
    let options: Preference[] = [];
    if (!allMatches) return options;

    options = allMatches
      .map(formatOptionsObject)
      .toSorted((a, b) => -b.firstLetter.localeCompare(a.firstLetter));
    return options;
  }, [allMatches]);

  if (isLoading) return <DefaultLoadingPage />;
  if (error) return <PleaseSignInPage />;

  const menteeOrMentorText =
    sessionData?.user?.roleName === "MENTEE" ? "Kin Mentors" : "Kin Mentees";

  return (
    <div className="flex flex-col px-4 py-6 md:px-32">
      <h1 className="my-0 text-center text-3xl font-normal md:my-3 md:text-6xl">
        Kin Mentorship Program Matching
      </h1>
      <Alert severity="info" icon={false} className="mb-4 mt-4 text-base">
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
        onSubmit={onSubmit}
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
