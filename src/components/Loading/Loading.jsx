import { useAuth } from "../../hooks/useAuth";

const Loading = () => {
  const { loading } = useAuth();
  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return null;
  }
};

export default Loading;
