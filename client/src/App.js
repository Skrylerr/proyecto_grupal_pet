import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./registro/Login";
import Register from "./registro/Register";
import CrearPet from "./views/CrearPet";
import EditPet from "./views/EditPet";
import Main from "./views/Main";
import Mypets from "./views/Mypets";
import Navbar from "./views/Navbar";
import PetDetail from "./views/PetDetail";

function App() {
  const navigate = useNavigate();
  const Key = "Esta es mi super clave";
  const [usuario, setUsuario] = useState();
  const [loggedUser, setLoggedUser] = useState(
    JSON.parse(sessionStorage.getItem("USUARIO"))
  );

  function handleLogout() {
    sessionStorage.removeItem("USUARIO");
    setLoggedUser(null);
  }
  useEffect(() => {
    if (!usuario) {
      if (sessionStorage.getItem("USUARIO")) {
        setUsuario(JSON.parse(sessionStorage.getItem("USUARIO")));
      } else {
        navigate("/login");
      }
    } else {
      sessionStorage.setItem("USUARIO", JSON.stringify(usuario));
    }
  }, []);

  return (
    <React.Fragment>
      <div>
        <Navbar loggedUser={loggedUser} handleLogout={handleLogout} />
      </div>
      <Routes>
        <Route path="/registro" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/*" element={<Main loggedUser={loggedUser} />} />
        <Route path="/pets/new" element={<CrearPet />}></Route>
        <Route path="/pets/:id" element={<PetDetail />}></Route>
        <Route path="/pets/:id/edit" element={<EditPet />}></Route>
        <Route path="/pets/:userId" element={<Mypets />}></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;

// import axios from "axios";
// import { useState } from "react";
// import "./App.css";
// import ImageCropDialog from "./ImageCropDialog";

// function App() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [displayImage, setDisplayImage] = useState(null);
//   const [isFirstUploaded, setIsFirstUploaded] = useState(false);
//   const formData = new FormData();

//   const onCancel = () => {
//     setSelectedImage(null);
//     setIsFirstUploaded(false);
//   };

//   const setCroppedImageFor = async (
//     id,
//     crop,
//     zoom,
//     aspect,
//     croppedImageUrl
//   ) => {
//     const newDisplayImage = {
//       ...displayImage,
//       croppedImageUrl,
//       crop,
//       zoom,
//       aspect
//     };
//     setDisplayImage(newDisplayImage);
//     setSelectedImage(null);
//     setIsFirstUploaded(false);
//     await fetch(newDisplayImage.croppedImageUrl).then(async (response) => {
//       const contentType = response.headers.get("content-type");
//       const blob = await response.blob();
//       const file = new File([blob], "myFile.jpg", { contentType });
//       console.log(file);
//       formData.append("image", file);
//     });
//     axios.post("http://localhost:8000/api/test", formData);
//   };

//   const resetImage = (id) => {
//     setCroppedImageFor(id);
//   };
//   const handleInput = async (e) => {
//     if (e.target.files[0]) {
//       const objectUrl = URL.createObjectURL(e.target.files[0]);
//       setDisplayImage({
//         id: 1,
//         imageUrl: objectUrl,
//         croppedImageUrl: null
//       });
//       setSelectedImage({
//         id: 1,
//         imageUrl: objectUrl,
//         croppedImageUrl: null
//       });
//       setIsFirstUploaded(true);
//     } else {
//       return;
//     }
//   };
//   return (
//     <div>
//       {selectedImage ? (
//         <ImageCropDialog
//           isFirstUploaded={isFirstUploaded}
//           setIsFirstUploaded={setIsFirstUploaded}
//           id={selectedImage.id}
//           imageUrl={selectedImage.imageUrl}
//           cropInit={selectedImage.crop}
//           zoomInit={selectedImage.zoom}
//           aspectInit={selectedImage.aspect}
//           onCancel={onCancel}
//           setCroppedImageFor={setCroppedImageFor}
//           resetImage={resetImage}
//         />
//       ) : null}
//       <input type="file" onInput={handleInput}></input>
//       {displayImage ? (
//         <img
//           className="imageCard"
//           key={displayImage.id}
//           alt=""
//           src={
//             displayImage.croppedImageUrl
//               ? displayImage.croppedImageUrl
//               : displayImage.imageUrl
//           }
//           onClick={() => setSelectedImage(displayImage)}
//         ></img>
//       ) : null}
//     </div>
//   );
// }

// export ;

//
