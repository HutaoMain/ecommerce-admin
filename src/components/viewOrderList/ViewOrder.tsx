import "./ViewOrder.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { orderInterface, orderListInterface } from "../../types/Types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ViewOrder = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [orderListJson, setOrderListJson] = useState<orderListInterface[]>();

  const { data } = useQuery<orderInterface>({
    queryKey: ["getOrderToGetOrderList"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/order/list/${id}`)
        .then((res) => res.data),
  });

  console.log("orderlist by id ", data?.orderList);

  useEffect(() => {
    setOrderListJson(eval(data?.orderList || ""));
  }, [data]);

  return (
    <div className="vieworder">
      <div style={{ border: "2px solid green" }}>
        <div style={{ padding: "10px 20px" }}>
          <span>{data?.status}</span>
        </div>
        <hr style={{ borderBottom: "2px solid gray" }} />
        <section className="ordercard">
          {orderListJson?.map((orderItem) => (
            <div className="ordercard-container" key={orderItem.id}>
              <img
                className="orderlist-image"
                src={orderItem.imageUrl}
                alt=""
              />
              <div className="ordercard-info-container">
                <span>{orderItem.productName}</span>
                <span style={{ color: "gray" }}>{orderItem.description}</span>
                <span>₱{orderItem.price}</span>
                <span>Qty: {orderItem.quantity}</span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ViewOrder;
