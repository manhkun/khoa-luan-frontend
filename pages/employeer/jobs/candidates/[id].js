import axios from "axios";
import Layout from "../../../../components/layouts";
import NotFound from "../../../../components/layouts/NotFound";
import JobCandidates from "../../../../components/job/JobCandidates";
import { isAuthenticatedUser } from "../../../../utils";


export default function CandidatesAppliedPage({ candidatesApplied, error }) {
  if (error && error.includes('Not found')) return <NotFound />
  return (
    <Layout title={'Job Candidates'}>
      <JobCandidates candidatesApplied={candidatesApplied} />
    </Layout>
  )
}

export async function getServerSideProps({ req, params }) {
  const access_token = req.cookies.access;
  const user = await isAuthenticatedUser(access_token);

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  try {
    const res = await axios.get(`${process.env.API_URL}/api/job/${params.id}/candidates/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    });
    const candidatesApplied = res.data;
  
    return {
      props: {
        candidatesApplied
      }
    }
  } catch (error) {
    return {
      props: {
        error: error.response.data.detail
      }
    }
  }
}
