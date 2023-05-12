import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserInterface } from "../../types/Types";

const UserPage = () => {
  const { data } = useQuery<UserInterface[]>({
    queryKey: ["orderListOrderPage"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/user/list`)
        .then((res) => res.data),
  });

  const userColumn: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
    {
      field: "name",
      headerName: "Fullname",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
    {
      field: "imageUrl",
      headerName: "Image",
      headerAlign: "center",
      align: "center",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <img
              src={params.row.imageUrl}
              alt="profile-image"
              className="category-img"
            />
          </>
        );
      },
    },
    {
      field: "userRole",
      headerName: "Role",
      headerAlign: "center",
      align: "center",
      width: 300,
      renderCell: (params) => {
        const handleRoleChange = (event: any) => {
          const newRole = event.target.value;
          axios.put(
            `${import.meta.env.VITE_APP_API_URL}/api/user/userRole/${
              params.row.id
            }`,
            {
              userRole: newRole,
            }
          );
        };

        return (
          <select
            defaultValue={params.row.userRole}
            onChange={handleRoleChange}
          >
            <option value="ROLE_ADMIN">ROLE_ADMIN</option>
            <option value="ROLE_STAFF">ROLE_STAFF</option>
            <option value="ROLE_USER">ROLE_USER</option>
          </select>
        );
      },
    },
    {
      field: "completeAddress",
      headerName: "Complete Address",
      headerAlign: "center",
      align: "center",
      width: 500,
      renderCell: (params) => {
        return (
          <>
            {params.row.street}, {params.row.barangay},{" "}
            {params.row.municipality}, {params.row.city},{" "}
            {params.row.postalCode}
          </>
        );
      },
    },
    {
      field: "contactNumber",
      headerName: "Contact number",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
  ];

  return (
    <div>
      <section>
        <DataGrid rows={data ?? []} columns={userColumn} />
      </section>
    </div>
  );
};

export default UserPage;
