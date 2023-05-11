import { useEffect, useState } from "react";
import { MdOutlineDownloadDone, MdOutlineUpload } from "react-icons/md";
import { categoryInterface } from "../../types/Types";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";

interface updateCategoryInterface {
  toggleModalUpdateCategory: any;
  paramsId: string;
}

const UpdateCategory = ({
  toggleModalUpdateCategory,
  paramsId,
}: updateCategoryInterface) => {
  const { data } = useQuery<categoryInterface>({
    queryKey: ["getCategoryByIdThenUpdate"],
    queryFn: async () =>
      await axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/category/${paramsId}`)
        .then((res) => res.data),
  });

  const [imageFile, setImageFile] = useState<string>("");
  const [categoryInfo, setCategoryInfo] = useState<categoryInterface>({
    id: "",
    categoryName: "",
    imageUrl: "",
  });

  useEffect(() => {
    setCategoryInfo({
      id: data?.id || "",
      categoryName: data?.categoryName || "",
      imageUrl: data?.imageUrl || "",
    });
  }, [paramsId, data]);

  console.log("category info", categoryInfo);

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

  const handleAddCat = async (e: any) => {
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

        await axios.put(
          `${import.meta.env.VITE_APP_API_URL}/api/category/update/${paramsId}`,
          {
            categoryName: categoryInfo.categoryName,
            imageUrl: url,
          }
        );
      } else {
        await axios.put(
          `${import.meta.env.VITE_APP_API_URL}/api/category/update/${paramsId}`,
          {
            categoryName: categoryInfo.categoryName,
            imageUrl: data?.imageUrl,
          }
        );
      }
      console.log("success");
      toast(" Successfully updated the category!", {
        type: "success",
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => window.location.reload(), 2000);
    } catch (err) {}
  };

  return (
    <div className="addcategory">
      <button
        className="addcategory-closebtn"
        onClick={toggleModalUpdateCategory}
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
              : categoryInfo?.imageUrl
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

      <div className="addcategory-itemlist">
        <input
          type="text"
          placeholder="Category name"
          className="addcategory-input"
          value={categoryInfo?.categoryName}
          onChange={(e) => {
            setCategoryInfo((data) => ({
              ...data,
              categoryName: e.target.value,
            }));
          }}
        />
      </div>

      <button className="addcategory-submitbtn" onClick={handleAddCat}>
        <MdOutlineDownloadDone /> Add Category
      </button>
    </div>
  );
};

export default UpdateCategory;
