import axios from "axios";
import JobDetails from "../../components/Job/JobDetails";
import Layout from "../../components/layouts";
import NotFound from "../../components/layouts/NotFound";


export default function JobDetailsPage({ data, access_token, error }) {
  if (error && error.includes('Not found')) return <NotFound />
  return (
    <Layout title={data.job.title}>
      <JobDetails job={data.job} candidates={data.candidates} access_token={access_token} />
    </Layout>
  )
}

export async function getServerSideProps({ req, params }) {
  try {
    const res = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}`);
    const data = res.data;
    const access_token = req.cookies.access || '';
  
    return {
      props: {
        data,
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
