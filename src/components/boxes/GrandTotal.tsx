import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./Boxes.css";

const GrandTotal = () => {
  const { data } = useQuery<number>({
    queryKey: ["totalPriceByStatusDelivered"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/order/total-price`)
        .then((res) => res.data),
  });

  return (
    <div className="boxes">
      <span>Grand Total of Sales</span>{" "}
      <span className="boxes-data"> ₱{data}</span>
    </div>
  );
};

export default GrandTotal;
