import Layout from "../../components/layouts";
import UpdateProfile from "../../components/user/UpdateProfile";
import { isAuthenticatedUser } from "../../utils";

export default function UpdateProfilePage() {
  return (
    <Layout title="Update profile">
      <UpdateProfile />
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
      data: access_token
    }
  }
}
