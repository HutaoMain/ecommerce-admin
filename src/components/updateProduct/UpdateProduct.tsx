import axios from "axios";
import { MdOutlineDownloadDone, MdOutlineUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { categoryInterface, productInterface } from "../../types/Types";
import { useQuery } from "@tanstack/react-query";

interface updateProductInterface {
  toggleModalUpdateProduct: any;
  paramsId: string;
}

const UpdateProduct = ({
  toggleModalUpdateProduct,
  paramsId,
}: updateProductInterface) => {
  const [imageFile, setImageFile] = useState<string>("");
  const [categoryDropDown, setCategoryDropDown] = useState<categoryInterface[]>(
    []
  );

  const [productInfo, setProductInfo] = useState<productInterface>({
    id: "",
    productName: "",
    imageUrl: "",
    description: "",
    price: 0,
    quantity: 0,
    category: {
      id: "",
      imageUrl: "",
      categoryName: "",
    },
    sold: 0,
  });

  const navigate = useNavigate();

  const { data } = useQuery<productInterface>({
    queryKey: ["getProductByIdThenUpdate"],
    queryFn: () =>
      axios
        .get(
          `${
            import.meta.env.VITE_APP_API_URL
          }/api/product/specificProduct/${paramsId}`
        )
        .then((res) => res.data),
  });

  useEffect(() => {
    setProductInfo({
      id: data?.id || "",
      productName: data?.productName || "",
      imageUrl: data?.imageUrl || "",
      description: data?.description || "",
      price: data?.price || 0,
      quantity: data?.quantity || 0,
      category: {
        id: data?.category.id || "",
        imageUrl: data?.category.imageUrl || "",
        categoryName: data?.category.categoryName || "",
      },
      sold: 0,
    });
  }, [data, paramsId]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/api/category/list`
      );
      setCategoryDropDown(res.data);
    };
    fetch();
  }, []);

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
      if (imageFile !== "") {
        const data = new FormData();
        data.append("file", imageFile);
        data.append("upload_preset", "upload");
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/alialcantara/image/upload",
          data
        );
        const { url } = uploadRes.data;

        await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/api/product/update/${paramsId}`,
          {
            productName: productInfo.productName,
            imageUrl: url,
            description: productInfo.description,
            price: productInfo.price,
            quantity: productInfo.quantity,
            categoryId: productInfo.category.id,
          }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/api/product/update/${paramsId}`,
          {
            productName: productInfo.productName,
            imageUrl: data,
            description: productInfo.description,
            price: productInfo.price,
            quantity: productInfo.quantity,
            categoryId: productInfo.category.id,
          }
        );
      }

      navigate("/products");
      console.log("success");
    } catch (err) {}
  };

  //   console.log(productInfo);

  return (
    <div className="addcategory">
      <button
        className="addcategory-closebtn"
        onClick={toggleModalUpdateProduct}
      >
        x
      </button>

      <div className="addcategory-itemlist">
        <img
          src={
            imageFile
              ? URL.createObjectURL(
                  new Blob([imageFile], { type: "image/jpeg" })
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
            value={productInfo.productName}
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
            value={productInfo.description}
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
            value={productInfo.price}
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
            value={productInfo.quantity}
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
            className="addcategory-input"
            value={productInfo.category.id}
            onChange={(e) => {
              const selectedCategory = categoryDropDown.find(
                (category) => category.id === e.target.value
              );
              setProductInfo((data) => ({
                ...data,
                category: selectedCategory || {
                  id: "",
                  imageUrl: "",
                  categoryName: "",
                },
              }));
            }}
          >
            {categoryDropDown?.map((item) => (
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

export default UpdateProduct;
