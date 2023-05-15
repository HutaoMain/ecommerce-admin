import { useQuery } from "@tanstack/react-query";
import { UserInterface } from "../../types/Types";
import axios from "axios";

const GrandTotalUsers = () => {
  const { data } = useQuery<UserInterface[]>({
    queryKey: ["grandTotalUsers"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/user/list`)
        .then((res) => res.data),
  });

  console.log(data?.length);

  return (
    <div className="boxes">
      <span>Total number of Users</span>{" "}
      <span className="boxes-data"> {data?.length}</span>
    </div>
  );
};

export default GrandTotalUsers;
