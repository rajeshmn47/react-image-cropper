import React, { useState } from "react";
import "./App.css";
import ImageCropper from "./components/ImageCropper";
import Slider from '@mui/material/Slider';
import { Button } from "@mui/material";


function App() {
  const [imageToCrop, setImageToCrop] = useState(undefined);
  const [croppedImage, setCroppedImage] = useState(undefined);
  const [value, setValue] = React.useState(1);
  const [contrast, setContrast] = React.useState(1);
  const handleChange = (event, newValue) => {
    console.log(newValue)
    setValue(newValue);
  };

  const handlecontrast = (event, newValue) => {
    console.log(newValue)
    setContrast(newValue);
  };


  const onUploadFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        const image = reader.result;

        setImageToCrop(image);
      });

      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const download = (a) => {
    var element = document.createElement("a");
    var file = new Blob(
      [
      a
      ],
      { type: "image/*" }
    );
    element.href = URL.createObjectURL(file);
    element.download = "image.jpg";
    element.click();
  };
  return (
    <div className="app">
      <input type="file" accept="image/*" onChange={onUploadFile} />
      <div style={{maxHeight:'85vh'}}>
        <ImageCropper
          imageToCrop={imageToCrop}
          onImageCropped={(croppedImage) => setCroppedImage(croppedImage)}
        />
      </div>
      {croppedImage && (
        <>
        <div>
          <h2>Cropped Image</h2>
          <img alt="Cropped Img" style={{filter:`brightness(${value/10})`,filter:`contrast(${contrast/10})`}} src={croppedImage} />
        </div>
        <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
          <h1>Brightness</h1>
      <Slider aria-label="Volume" value={value} onChange={handleChange} style={{width:'50vw'}}/>
      <h1>Contrast</h1>
      <Slider aria-label="Volume" value={contrast} onChange={handlecontrast} style={{width:'50vw'}}/>
      </div>
      {croppedImage&&<a
         href={croppedImage}
         download
         onClick={() => download(croppedImage)}
       >
         <i className="fa fa-download" />
      <Button>Download</Button>
       </a>}
      </>
      )}
     
    </div>
  );
}

export default App;