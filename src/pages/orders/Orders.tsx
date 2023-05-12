import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "./Orders.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { orderInterface } from "../../types/Types";
import { Link } from "react-router-dom";

const Orders = () => {
  const { data } = useQuery<orderInterface[]>({
    queryKey: ["orderListOrderPage"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/order/list`)
        .then((res) => res.data),
  });

  const orderColumn: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      width: 250,
      renderCell: (params) => {
        const handleStatusChange = (event: any) => {
          const newStatus = event.target.value;
          axios.put(
            `${import.meta.env.VITE_APP_API_URL}/api/order/updateStatus/${
              params.row.id
            }`,
            {
              status: newStatus,
            }
          );
        };

        return (
          <select
            defaultValue={params.row.status}
            onChange={handleStatusChange}
          >
            <option value="Pending">Pending</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      align: "center",
      width: 250,
    },
    {
      field: "paymentMethod",
      headerName: "Payment method",
      headerAlign: "center",
      align: "center",
      width: 250,
    },
    {
      field: "recept",
      headerName: "Receipt",
      headerAlign: "center",
      align: "center",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <img
              src={params.row.receipt}
              alt="category"
              className="category-img"
            />
          </>
        );
      },
    },
    {
      field: "totalPrice",
      headerName: "Total price",
      headerAlign: "center",
      align: "center",
      width: 250,
    },
    {
      field: "action",
      headerName: "Action Button",
      headerAlign: "center",
      align: "center",
      width: 250,
      renderCell: (params) => {
        return (
          <div>
            <Link to={`/orders/${params.row.id}`}>
              <button
                className="order-actionbtn"
                style={{ backgroundColor: "green" }}
              >
                View Products Ordered
              </button>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <section>
        <DataGrid rows={data ?? []} columns={orderColumn} />
      </section>
    </div>
  );
};

export default Orders;
