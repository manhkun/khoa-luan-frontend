import axios from "axios";
import Layout from "../components/layouts";
import Home from "../components/Home";


export default function Index({ data }) {
  console.log(data)
  return (
    <Layout>
      <Home data={data} />
    </Layout>
  )
}


export async function getServerSideProps() {
  const res = await axios.get(`${process.env.API_URL}/api/jobs/`)
  const data = res.data

  return {
    props: {
      data,
    }
  }
}
