import { useState } from "react";
import ImageCropDialog from "./ImageCropDialog";

function PetImageInput({ linkimagen, setIsCropperDisplayed, putImage }) {
  const [selectedImage, setSelectedImage] = useState(false);
  const [displayImage, setDisplayImage] = useState(null);
  const [isFirstUploaded, setIsFirstUploaded] = useState(false);

  const onCancel = () => {
    setSelectedImage(false);
    setIsFirstUploaded(false);
    setIsCropperDisplayed(false);
  };

  const setCroppedImageFor = async (
    id,
    crop,
    zoom,
    aspect,
    croppedImageUrl
  ) => {
    const newDisplayImage = {
      ...displayImage,
      croppedImageUrl,
      crop,
      zoom,
      aspect
    };
    setDisplayImage(newDisplayImage);
    setSelectedImage(false);
    setIsFirstUploaded(false);
    setIsCropperDisplayed(false);

    await fetch(newDisplayImage.croppedImageUrl).then(async (response) => {
      const contentType = response.headers.get("content-type");
      const blob = await response.blob();
      const file = new File([blob], "myFile.jpg", { contentType });
      putImage(file);
    });
  };

  const resetImage = (id) => {
    setCroppedImageFor(id);
  };
  const handleInput = async (e) => {
    if (e.target.files[0]) {
      const objectUrl = URL.createObjectURL(e.target.files[0]);
      setDisplayImage({
        id: 1,
        imageUrl: objectUrl,
        croppedImageUrl: null
      });
      setSelectedImage({
        id: 1,
        imageUrl: objectUrl,
        croppedImageUrl: null
      });
      setIsFirstUploaded(true);
      setIsCropperDisplayed(true);
    } else {
      return;
    }
  };
  return (
    <div className="row">
      <div className="col">
        <input
          type="file"
          id={linkimagen}
          className="form-control"
          style={{ width: "100%" }}
          onInput={handleInput}
        ></input>
      </div>
      {displayImage ? (
        <img
          className="col-4 row ms-2 rounded-4 p-0"
          key={displayImage.id}
          alt=""
          src={
            displayImage.croppedImageUrl
              ? displayImage.croppedImageUrl
              : displayImage.imageUrl
          }
          style={{ cursor: "pointer", boxShadow: "1px 1px 5px" }}
          onClick={() => {
            setSelectedImage(displayImage);
            setIsCropperDisplayed(true);
          }}
        ></img>
      ) : null}
      {selectedImage ? (
        <ImageCropDialog
          isFirstUploaded={isFirstUploaded}
          setIsFirstUploaded={setIsFirstUploaded}
          id={selectedImage.id}
          imageUrl={selectedImage.imageUrl}
          cropInit={selectedImage.crop}
          zoomInit={selectedImage.zoom}
          aspectInit={selectedImage.aspect}
          onCancel={onCancel}
          setCroppedImageFor={setCroppedImageFor}
          resetImage={resetImage}
        />
      ) : null}
    </div>
  );
}

export default PetImageInput;
