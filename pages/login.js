import axios from "axios";
import Layout from "../components/layouts";
import Login from "../components/auth/Login";


export default function Index({ data }) {
  console.log(data)
  return (
    <Layout title="Login">
      <Login data={data} />
    </Layout>
  )
}
