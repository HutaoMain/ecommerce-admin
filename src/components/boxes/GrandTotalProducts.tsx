import { useQuery } from "@tanstack/react-query";
import { productInterface } from "../../types/Types";
import axios from "axios";

const GrandTotalProducts = () => {
  const { data } = useQuery<productInterface[]>({
    queryKey: ["grandTotalProducts"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/product/list`)
        .then((res) => res.data),
  });

  return (
    <div className="boxes">
      <span>Total number of Products</span>{" "}
      <span className="boxes-data"> {data?.length}</span>
    </div>
  );
};

export default GrandTotalProducts;
