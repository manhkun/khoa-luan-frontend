import axios from "axios";
import JobDetails from "../../components/Job/JobDetails";
import Layout from "../../components/layouts";


export default function JobDetailsPage({ data }) {
  console.log(data)
  return (
    <Layout>
      <JobDetails job={data.job} candidates={data.candidates} />
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const res = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}`);
  const data = res.data;
  const candidates = res.data;

  return {
    props: {
      data
    }
  }
}
