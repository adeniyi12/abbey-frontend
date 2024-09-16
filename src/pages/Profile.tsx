import { useParams } from "react-router-dom";
import { userDetails } from "../api/services/user";
import EditUserDetails from "../components/EditUserDetails";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Profile = () => {
  const { id } = useParams();
  console.log(id)
  const userId = String(id);
  const { data: user, isLoading, error } = userDetails(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      <Header />
      <section className="mx-4 md:mx-14">
        <EditUserDetails user={user} />
      </section>
      <Footer />
    </>
  );
};

export default Profile;
