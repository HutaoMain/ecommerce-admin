import { useQuery } from "@tanstack/react-query";
import { categoryInterface } from "../../types/Types";
import axios from "axios";

const GrandTotalCategory = () => {
  const { data } = useQuery<categoryInterface[]>({
    queryKey: ["grandTotalCategory"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/category/list`)
        .then((res) => res.data),
  });

  return (
    <div className="boxes">
      <span>Total number of Categories</span>{" "}
      <span className="boxes-data"> {data?.length}</span>
    </div>
  );
};

export default GrandTotalCategory;
