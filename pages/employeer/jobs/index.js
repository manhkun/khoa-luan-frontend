import Layout from "../../../components/layouts";
import MyJobs from "../../../components/job/MyJobs";
import { isAuthenticatedUser } from "../../../utils";
import axios from "axios";

export default function MyJobPage({ jobs, access_token }) {
  return (
    <Layout title="My job">
      <MyJobs jobs={jobs} access_token={access_token} />
    </Layout> 
  )
}

export async function getServerSideProps({ req }) {
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

  const res = await axios.get(`${process.env.API_URL}/api/me/jobs/`, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  const jobs = res.data

  return {
    props: {
      jobs,
      access_token
    }
  }
}
