import React, { useRef, useState } from 'react';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import getCroppedImg from './utilities/cropImage';
import './App.css';
import logo from './images/logo192.png'

const App = () => {
  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const inputRef = useRef();
  const tyu=<img src={logo} alt='' width='400'/>

  const triggerFileSelectPopup = () => inputRef.current.click(); 

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    console.log(croppedAreaPixels, croppedAreaPercentage);
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = event => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader(); 
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener('load', () => {
        setImage(reader.result);
      });
    }
  };

  const convertCanvasToImg = (canvas) => {
    let img = new Image();
    //img.src = canvas.toDataURL();
    img.src = tyu.props.src
    return img;
  };

  const onImageCrop = async () => {
    let croppedImageCanvas = await getCroppedImg(image, croppedArea);
    let croppedImage = convertCanvasToImg(croppedImageCanvas);

    setCroppedImage(croppedImage);
  }

  console.log('CROPPED IMAGE:', croppedImage?.props,croppedImage);
  console.log('rJESJJS',<img src={logo} alt='' width='400'/>)
 
  console.log('source',tyu.props.src)
  return (
    <>
    <div className="container">
      <div className="container-cropper">
        {
          image ? 
          <>
            <div className="cropper">
              <Cropper 
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete} />
            </div>

            <div className="slider">
              <Slider 
                min={1} 
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e, zoom) => setZoom(zoom)} />
            </div>
          </> : null
        }
      </div>

      <div className="container-buttons">
        <input 
          type="file" 
          accept="image/*" 
          ref={inputRef} 
          style={{ display: "none" }} 
          onChange={onSelectFile} />
        <Button variant="contained" color="primary" onClick={triggerFileSelectPopup}>
          Choose
        </Button>
        <Button variant="contained" color="secondary" onClick={onImageCrop} style={{ marginLeft: "20px" }}>
          Download
        </Button>
      </div>
   
    </div>
    <div>
     {croppedImage&&<img src={logo} alt='' width='400'/>}
     <img src={croppedImage} alt='' width='233' />
     </div>
     {croppedImage&&<img src={tyu.props.src} alt='' />}
     <img src={croppedImage} alt=''/>
     </>
  );
};

export default App;