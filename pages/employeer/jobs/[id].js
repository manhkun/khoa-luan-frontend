import axios from "axios";
import Layout from "../../../components/layouts";
import NotFound from "../../../components/layouts/NotFound";
import { isAuthenticatedUser } from "../../../utils";
import UpdateJob from "../../../components/Job/UpdateJob";

export default function UpdateJobPage({ job, access_token, error }) {
  if (error && error.includes('Not found')) return <NotFound />
  return (
    <Layout title={'Job Candidates'}>
      <UpdateJob access_token={access_token} job={job} />
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
    const res = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}/`);
    const job = res.data.job;
    console.log(res.data)
  
    return {
      props: {
        job,
        access_token
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
