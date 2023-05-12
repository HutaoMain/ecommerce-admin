import axios from "axios";
import "./AddProduct.css";
import { MdOutlineDownloadDone, MdOutlineUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { categoryInterface, productInterface } from "../../types/Types";
import { useQuery } from "@tanstack/react-query";

const AddProduct = ({ toggleAddProduct }: any) => {
  const [ImageFile, setImageFile] = useState<string>("");
  const [productInfo, setProductInfo] = useState<productInterface>({
    id: "",
    productName: "",
    imageUrl: "",
    description: "",
    price: 0,
    quantity: 0,
    category: {
      id: "",
      categoryName: "",
      imageUrl: "",
    },
    sold: 0,
  });

  const navigate = useNavigate();

  const { data } = useQuery<categoryInterface[]>({
    queryKey: ["categoryListForDropDown"],
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/category/list`)
        .then((res) => res.data),
  });

  const fileTypeChecking = (e: any) => {
    var fileInput = document.getElementById("file-upload") as HTMLInputElement;
    var filePath = fileInput.value;

    // Allowing file type
    var allowedExtensions = /(\.png|\.jpg|\.jpeg)$/i;
    // |\.pdf|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd

    if (!allowedExtensions.exec(filePath)) {
      alert("Invalid file type");
      fileInput.value = "";
      return false;
    }

    setImageFile(e.target.files[0]);
  };

  const handleAddProduct = async (e: any) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("file", ImageFile);
      data.append("upload_preset", "upload");
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/alialcantara/image/upload",
        data
      );
      const { url } = uploadRes.data;

      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/api/product/create`,
        {
          productName: productInfo.productName,
          imageUrl: url,
          description: productInfo.description,
          price: productInfo.price,
          quantity: productInfo.quantity,
          categoryId: productInfo.category.id,
        }
      );
      navigate("/products");
      console.log("success");
    } catch (err) {}
  };

  console.log(productInfo);

  return (
    <div className="addcategory">
      <button className="addcategory-closebtn" onClick={toggleAddProduct}>
        x
      </button>

      <div className="addcategory-itemlist">
        <img
          src={
            ImageFile
              ? URL.createObjectURL(
                  new Blob([ImageFile], { type: "image/jpeg" })
                )
              : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
          }
          alt="AddImage"
          className="addcategory-img"
        />
        <label htmlFor="file-upload" className="receipt-input-image">
          <MdOutlineUpload /> Upload the image of category here..
          <input
            type="file"
            id="file-upload"
            onChange={fileTypeChecking}
            style={{ display: "none" }}
          />
        </label>
      </div>

      <div className="addproduct-container">
        <div className="addcategory-itemlist">
          <input
            type="text"
            placeholder="Product Name"
            className="addcategory-input"
            onChange={(e) => {
              setProductInfo((data) => ({
                ...data,
                productName: e.target.value,
              }));
            }}
          />
        </div>

        <div className="addcategory-itemlist">
          <input
            type="text"
            placeholder="description"
            className="addcategory-input"
            onChange={(e) => {
              setProductInfo((data) => ({
                ...data,
                description: e.target.value,
              }));
            }}
          />
        </div>

        <div className="addcategory-itemlist">
          <input
            type="number"
            placeholder="Price"
            className="addcategory-input"
            onChange={(e) => {
              setProductInfo((data) => ({
                ...data,
                price: parseInt(e.target.value),
              }));
            }}
          />
        </div>

        <div className="addcategory-itemlist">
          <input
            type="number"
            placeholder="Quantity"
            className="addcategory-input"
            onChange={(e) => {
              setProductInfo((data) => ({
                ...data,
                quantity: parseInt(e.target.value),
              }));
            }}
          />
        </div>

        <div className="addcategory-itemlist">
          <select
            onChange={(e) => {
              const selectedCategoryId = e.target.value;
              const selectedCategory = data?.find(
                (item) => item.id === selectedCategoryId
              );
              setProductInfo((data) => ({
                ...data,
                categoryId: selectedCategory?.id || null,
              }));
            }}
          >
            {data?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.categoryName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button className="addcategory-submitbtn" onClick={handleAddProduct}>
        <MdOutlineDownloadDone /> Add Product
      </button>
    </div>
  );
};

export default AddProduct;
