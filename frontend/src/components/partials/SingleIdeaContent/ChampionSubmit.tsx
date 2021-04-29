import { useContext, useEffect, useState } from "react";
import { Button, Alert } from "react-bootstrap"
import { useParams } from "react-router";
import { UserProfileContext } from "src/contexts/UserProfile.Context";
import { useSubmitChampionRequestMutation } from "src/hooks/championHooks";
import { IFetchError } from "src/lib/types/types";
import { handlePotentialAxiosError } from "src/lib/utilityFunctions";

interface ChampionSubmitProps {
  
}

const ChampionSubmit = (props: ChampionSubmitProps) => {
  const { token } = useContext(UserProfileContext);
  const { ideaId } = useParams<{ ideaId: string}>();

  const {
    submitChampionRequestMutation,
    isError,
    error,
    isLoading,
  } = useSubmitChampionRequestMutation(parseInt(ideaId), token);

  const [ showError, setShowError ] = useState(false);
  const [ fetchError, setFetchError ] = useState<IFetchError | null>(null);

  useEffect(() => {
    setShowError(isError)
    console.log(error);
  }, [isError])

  useEffect(() => {
    if (error) {
      const potentialFetchError = handlePotentialAxiosError(
        "An Error occured while trying to champion an idea.",
        error
      );
      setFetchError(potentialFetchError);
    }
  }, [error])

  const submitHandler = () => {
    console.log("Submit Champion request");
    submitChampionRequestMutation();
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      {showError && (
        <Alert
          className='w-100'
          show={showError}
          onClose={() => setShowError(false)}
          dismissible
          variant='danger'
        >
          {/* {'An error occured while trying to champion an idea'} */}
          {fetchError?.message ?? "An error occured while trying to champion an idea."}
        </Alert>
      )}
      <Button 
        onClick={submitHandler} 
        variant='warning'
        disabled={isLoading}
      >
        Champion!
      </Button>
    </div>
  );
}

export default ChampionSubmit