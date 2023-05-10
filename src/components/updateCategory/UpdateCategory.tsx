import { useState } from "react";
import { MdOutlineDownloadDone, MdOutlineUpload } from "react-icons/md";
import { categoryInterface } from "../../types/Types";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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
    queryFn: () =>
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/category/${paramsId}`)
        .then((res) => res.data),
  });

  const [ImageFile, setImageFile] = useState<string>("");
  const [categoryInfo, setCategoryInfo] = useState<categoryInterface>({
    id: "",
    categoryName: "",
    imageUrl: "",
  });

  const navigate = useNavigate();

  console.log(categoryInfo);

  // useEffect(() => {
  //   setCategoryInfo({
  //     id: data?.id || "",
  //     categoryName: data?.categoryName || "",
  //     imageUrl: data?.imageUrl || "",
  //   });
  // }, [paramsId, data]);

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
      const data = new FormData();
      data.append("file", ImageFile);
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
      navigate("/categories");
      console.log("success");
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
            ImageFile
              ? URL.createObjectURL(
                  new Blob([ImageFile], { type: "image/jpeg" })
                )
              : data?.imageUrl
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
          placeholder="Category Name"
          className="addcategory-input"
          value={data?.categoryName}
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
