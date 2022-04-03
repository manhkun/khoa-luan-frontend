import Layout from "../../../components/layouts";
import NewJob from "../../../components/Job/NewJob";
import { isAuthenticatedUser } from "../../../utils";

export default function NewJobPage({ access_token }) {
  return (
    <Layout title="Job applied">
      <NewJob access_token={access_token} />
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

  return {
    props: {
      access_token
    }
  }
}
