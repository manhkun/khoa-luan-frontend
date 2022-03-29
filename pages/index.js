import axios from "axios";
import Layout from "../components/layouts";
import Home from "../components/Home";
import { serialize } from "../utils";


export default function Index({ data }) {
  console.log(data)
  return (
    <Layout>
      <Home data={data} />
    </Layout>
  )
}


export async function getServerSideProps({ query }) {
  const queryObj = {
    keyword: query.keyword || '',
    location: query.location || '',
    page: query.page || 1,
    jobType: query.jobType || '',
    education: query.education || '',
    experience: query.experience || '',
    min_salary: '',
    max_salary: ''
  }

  if (query.salary) {
    const [min, max] = query.salary.split('-');
    queryObj.min_salary = min;
    queryObj.max_salary = max;
  }

  const queryStr = serialize(queryObj);
  const res = await axios.get(`${process.env.API_URL}/api/jobs/?${queryStr}`);
  const data = res.data;

  return {
    props: {
      data,
    }
  }
}
