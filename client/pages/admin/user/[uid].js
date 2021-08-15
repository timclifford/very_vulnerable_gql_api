import { useQuery } from "@apollo/client";
import { useRouter } from 'next/router';
import Layout from "../../../components/Layout/Layout";
import User from "../../../components/User";
import USER from "../../../graphql/user.query";

const UserSlug = () => {
  const router = useRouter();
  const { uid } = router.query;

  const { data, loading, error } = useQuery(USER, {
    variables: { _id: uid },
  });

  if (loading) {
    return <p className="py-4">Loading...</p>;
  }
  if (error) {
    return (
      <Layout>
        <div>{JSON.stringify(error.message)}</div>
      </Layout>
    );
  }

  return (
    <Layout>
        <User {...data.user}/>
    </Layout>
  )
}

export default UserSlug;
