import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { IdeaData } from '../lib/types/data.types';
import { FetchMeta } from '../lib/types/types';
import axios from 'axios';
import { API_BASE_URL } from '../lib/constants';

// Extends Route component props with idea title route param
interface SingleIdeaPageProps extends RouteComponentProps<{
  ideaId: string
}> {
  // Add custom added props here 
}

const SingleIdeaPage: React.FC<SingleIdeaPageProps> = (props) => {
  // Destructured props
  const { match: { params: { ideaId }}} = props;

  const [pageData, setPageData] = useState<IdeaData | null>(null);
  const [fetchMeta, setFetchMeta] = useState<FetchMeta>({
    loading: false,
    errors: null, // Can be an array of errors
  });

  useEffect(() => {
    // TODO: create an axios fetch wrapper
    const fetchIdea = async () => {
      try {
        // Set loading state
        setFetchMeta((prevState) => ({
          ...prevState,
          loading: true,
        }))
        const res = await axios.get<IdeaData>(`${API_BASE_URL}/idea/get/${ideaId}`)

        setPageData(res.data);
        setFetchMeta({ loading: false, errors: null })
      } catch (error) {
        if (error.response) {
          const { message, details } = error.response?.data;
          setFetchMeta({
            loading: false,
            errors: [
              {
                message: message,
                details: details.errorMessage,
              }
            ]
          })
          console.log(error.response)
        } else {
          setFetchMeta({ loading: false, errors: [{ message: error.message }]});
        }
      }
    }
    fetchIdea();
  }, []);


  // Set loading

  // Set errors

  // Set succesful
  return(
    <div>
      <h1>A single page idea {ideaId}</h1>
    </div>
  )
}

export default SingleIdeaPage