import "./ProductPage.css";
import axios from "axios";
import Modal from "react-modal";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { productInterface } from "../../types/Types";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Confirmation from "../../components/confirmationModal/Confirmation";
import { BiCategory } from "react-icons/bi";
import { AiOutlineFileAdd } from "react-icons/ai";
import AddProduct from "../../components/addProduct/AddProduct";

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

const customStyleAddProduct = {
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

const ProductPage = () => {
  const [list, setList] = useState<productInterface[]>([]);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [paramsId, setParamsId] = useState<string>("");
  const [isOpenAddProduct, setIsOpenAddProduct] = useState<boolean>(false);

  const { data } = useQuery<productInterface[]>({
    queryKey: ["productList"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/product/list`)
        .then((res) => res.data),
  });

  useEffect(() => {
    setList(data || []);
  }, [data]);

  const toggleModalProduct = (id: any) => {
    setParamsId(id);
    setIsOpenModal(!isOpenModal);
  };

  const handleDelete = async (id: any) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/api/product/delete/${id}`
      );
      setList(list.filter((item) => item.id !== id));
      window.location.reload();
    } catch (err) {}
  };

  const productColumn: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "center",
      width: 300,
    },
    {
      field: "productName",
      headerName: "Product Name",
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
      field: "description",
      headerName: "Description",
      headerAlign: "center",
      align: "center",
      width: 250,
    },
    {
      field: "price",
      headerName: "Price",
      headerAlign: "center",
      align: "center",
      width: 250,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerAlign: "center",
      align: "center",
      width: 250,
    },
    {
      field: "category",
      headerName: "Category",
      headerAlign: "center",
      align: "center",
      width: 250,
      valueGetter: (params) => params.row.category?.categoryName,
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
            <Link to={`${params.row.id}`} style={{ textDecoration: "none" }}>
              <button
                className="category-actionbtn"
                style={{ backgroundColor: "blue" }}
              >
                Update
              </button>
            </Link>
            <button
              className="category-actionbtn"
              style={{ backgroundColor: "red" }}
              onClick={() => toggleModalProduct(params.row.id)}
            >
              Delete
            </button>
            <Modal
              isOpen={isOpenModal}
              onRequestClose={toggleModalProduct}
              style={customStyles}
              contentLabel="My dialog"
            >
              <Confirmation
                action="delete"
                whatItem="product"
                btnConfirm={() => handleDelete(paramsId)}
                closeModal={toggleModalProduct}
              />
            </Modal>
          </div>
        );
      },
    },
  ];

  const toggleAddProduct = () => {
    setIsOpenAddProduct(!isOpenAddProduct);
  };

  return (
    <div className="productpage">
      <div className="categorypage-title">
        <BiCategory style={{ fontSize: "25px" }} /> <h2>Products</h2>
      </div>
      <div className="categorypage-addcategory" onClick={toggleAddProduct}>
        Add Product <AiOutlineFileAdd />
      </div>
      <section className="productpage-container">
        <DataGrid rows={data ?? []} columns={productColumn} />
      </section>
      <Modal
        isOpen={isOpenAddProduct}
        onRequestClose={toggleAddProduct}
        style={customStyleAddProduct}
      >
        <AddProduct toggleAddProduct={toggleAddProduct} />
      </Modal>
    </div>
  );
};

export default ProductPage;
