import axios from "axios";
import { useState, useEffect, createContext } from "react"
import { useRouter } from "next/router";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(null);
  const [applied, setApplied] = useState(null);

  const applyToJob = async (id, access_token) => {
    try {
      setLoading(true);
      console.log(access_token)
      const res = await axios.post(`${process.env.API_URL}/api/jobs/${id}/apply/`,{}, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      if (res.data.applied) {
        setLoading(false);
        setApplied(true);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response && (error.response.data.detail || error.response.data.error));
    }
  }

  // Clear errors
  const clearErrors = () => {
    setError(null);
  }

  return (
    <JobContext.Provider
      value={{
        loading,
        updated,
        error,
        applied,
        applyToJob,
        setUpdated,
        clearErrors
      }}
    >
      {children}
    </JobContext.Provider>
  )
}

export default JobContext;
