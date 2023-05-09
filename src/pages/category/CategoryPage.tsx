import "./CategoryPage.css";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { categoryInterface } from "../../types/Types";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import Confirmation from "../../components/confirmationModal/Confirmation";
import { BiCategory } from "react-icons/bi";
import { AiOutlineFileAdd } from "react-icons/ai";
import AddCategory from "../../components/addCategory/AddCategory";
import UpdateCategory from "../../components/updateCategory/UpdateCategory";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "30px",
    padding: "50px",
  },
};

const customStyleAddCategory = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "30px",
    padding: "50px",
  },
};

Modal.setAppElement("#root");

const CategoryPage = () => {
  const [list, setList] = useState<categoryInterface[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenUpdateCategory, setIsOpenUpdateCategory] =
    useState<boolean>(false);
  const [isOpenAddCategory, setIsOpenAddCategory] = useState<boolean>(false);
  const [paramsId, setParamsId] = useState<string>("");

  const { data } = useQuery<categoryInterface[]>({
    queryKey: ["categoryList"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/category/list`)
        .then((res) => res.data),
  });

  useEffect(() => {
    setList(data || []);
  }, [data]);

  const toggleModalCategory = (id: any) => {
    setParamsId(id);
    setIsOpenModal(!isOpenModal);
  };

  const toggleModalUpdateCategory = (id: any) => {
    setParamsId(id);
    setIsOpenUpdateCategory(!isOpenUpdateCategory);
  };

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/category/delete/${id}`
      );
      setList(list.filter((item) => item.id !== id));
      window.location.reload();
    } catch (err) {}
  };

  const categoryColumn: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
    {
      field: "categoryName",
      headerName: "Category Name",
      headerAlign: "center",
      align: "center",
      width: 250,
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
              alt="category"
              className="category-img"
            />
          </>
        );
      },
    },
    {
      field: "actionButton",
      headerName: "Action Button",
      headerAlign: "center",
      align: "center",
      width: 230,
      renderCell: (params) => {
        return (
          <div>
            {/* <Link to={`${params.row.id}`} style={{ textDecoration: "none" }}> */}
            <button
              className="category-actionbtn"
              style={{ backgroundColor: "blue" }}
              onClick={() => toggleModalUpdateCategory(params.row.id)}
            >
              Update
            </button>
            {/* </Link> */}
            <button
              className="category-actionbtn"
              style={{ backgroundColor: "red" }}
              onClick={() => toggleModalCategory(params.row.id)}
            >
              Delete
            </button>
            <Modal
              isOpen={isOpenModal}
              onRequestClose={toggleModalCategory}
              style={customStyles}
              contentLabel="My dialog"
            >
              <Confirmation
                action="delete"
                whatItem="category"
                btnConfirm={() => handleDelete(paramsId)}
                closeModal={toggleModalCategory}
              />
            </Modal>
          </div>
        );
      },
    },
  ];

  const toggleAddCategory = () => {
    setIsOpenAddCategory(!isOpenAddCategory);
  };

  return (
    <div className="categorypage">
      <div className="categorypage-title">
        <BiCategory style={{ fontSize: "25px" }} /> <h2>Categories</h2>
      </div>
      <div className="categorypage-addcategory" onClick={toggleAddCategory}>
        Add Category <AiOutlineFileAdd />
      </div>
      <section className="categorypage-container">
        <DataGrid rows={data ?? []} columns={categoryColumn} />
      </section>
      <Modal
        isOpen={isOpenAddCategory}
        onRequestClose={toggleAddCategory}
        style={customStyleAddCategory}
      >
        <AddCategory toggleAddCategory={toggleAddCategory} />
      </Modal>
      <Modal
        isOpen={isOpenUpdateCategory}
        onRequestClose={toggleModalUpdateCategory}
        style={customStyleAddCategory}
      >
        <UpdateCategory
          toggleModalUpdateCategory={toggleModalUpdateCategory}
          paramsId={paramsId}
        />
      </Modal>
    </div>
  );
};

export default CategoryPage;
