import axios from "axios";
import JobDetails from "../../components/Job/JobDetails";
import Layout from "../../components/layouts";
import NotFound from "../../components/layouts/NotFound";


export default function JobDetailsPage({ data, error }) {
  console.log(data)
  if (error && error.includes('Not found')) return <NotFound />
  return (
    <Layout title={data.job.title}>
      <JobDetails job={data.job} candidates={data.candidates} />
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  try {
    const res = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}`);
    const data = res.data;
  
    return {
      props: {
        data
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
