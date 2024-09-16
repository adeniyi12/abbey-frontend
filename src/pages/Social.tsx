import { useParams } from "react-router-dom";
import { isFollowing, userRelationships } from "../api/services/relationship";
import Footer from "../components/Footer";
import Header from "../components/Header";
import UserRelationships from "../components/UserRelationships";
import UserCard from "../components/UserCard";
import UserStats from "../components/UserStats";
import { userDetails } from "../api/services/user";

const Social = () => {
    const { id } = useParams();
    const userId = String(id);
  const { data: friends, isLoading, error } = userRelationships(userId, "friends");
  const { data: followers, isLoading: followersLoading, error: followersError } = userRelationships(userId, "followers");
  const { data: following, isLoading: followingLoading, error: followingError } = userRelationships(userId, "following");

  const { data: user, isLoading: userLoading, error: userError } = userDetails(userId);
  const { data: status, isLoading: statusLoading, error: statusError } = isFollowing(userId);

  if (isLoading || followersLoading || followingLoading || userLoading || statusLoading) {
    return <div>Loading...</div>;
  }

  if (error || followersError || followingError || userError || statusError) {
    return <div>Error</div>;
  }

  return (
    <>
      <Header />
      <UserCard profile={user} status={status} />
      <UserStats friendsData={friends} followersData={followers} followingData={following} />
      <UserRelationships friendsData={friends} followersData={followers} followingData={following} />
      <Footer />
    </>
  );
};

export default Social;
