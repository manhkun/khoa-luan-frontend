import axios from "axios";
import { useState, createContext } from "react"
import { useRouter } from "next/router";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [created, setCreated] = useState(null);
  const [updated, setUpdated] = useState(null);
  const [deleted, setDeleted] = useState(null);
  const [applied, setApplied] = useState(null);
  const [stats, setStats] = useState(null);

  const createNewJob = async (data, access_token) => {
    try {
      setLoading(true);
      const res = await axios.post(`${process.env.API_URL}/api/jobs/new/`, data, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      if (res.data) {
        setLoading(false);
        setCreated(true);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response && (error.response.data.detail || error.response.data.error));
    }
  }

  const updateJob = async (id, data, access_token) => {
    try {
      setLoading(true);
      const res = await axios.put(`${process.env.API_URL}/api/jobs/${id}/update/`, data, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      if (res.data) {
        setLoading(false);
        setUpdated(true);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response && (error.response.data.detail || error.response.data.error));
    }
  }

  const deleteJob = async (id, access_token) => {
    try {
      setLoading(true);
      const res = await axios.delete(`${process.env.API_URL}/api/jobs/${id}/delete/`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      setLoading(false);
      setDeleted(true);
    } catch (error) {
      setLoading(false);
      setError(error.response && (error.response.data.detail || error.response.data.error));
    }
  }

  const applyToJob = async (id, access_token) => {
    try {
      setLoading(true);
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

  const checkJobApplied = async (id, access_token) => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.API_URL}/api/jobs/${id}/check/`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });

      setLoading(false);
      setApplied(res.data);
    } catch (error) {
      setLoading(false);
      setError(error.response && (error.response.data.detail || error.response.data.error));
    }
  }

  const getTopicStats = async (topic) => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.API_URL}/api/stats/${topic}/`);

      setLoading(false);
      setStats(res.data);
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
        created,
        error,
        applied,
        updated,
        deleted,
        stats,
        getTopicStats,
        applyToJob,
        checkJobApplied,
        clearErrors,
        createNewJob,
        deleteJob,
        setCreated,
        updateJob,
        setUpdated,
        setDeleted
      }}
    >
      {children}
    </JobContext.Provider>
  )
}

export default JobContext;
