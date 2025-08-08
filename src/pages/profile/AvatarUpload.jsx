import React, { useState, useCallback, memo } from "react";
import Cropper from "react-easy-crop";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
  Button,
} from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import getCroppedImg from "./getCroppedImg";
const AvatarUpload = memo(({ avatar, onSave, viewOnly = false, ...rest }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);
  const [preview, setPreview] = useState(avatar);

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setOpenCrop(true);
      };
      reader.readAsDataURL(file);
      e.target.value = null;
    }
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropSave = async () => {
    const croppedImageFile = await getCroppedImg(imageSrc, croppedAreaPixels);
    const previewUrl = URL.createObjectURL(croppedImageFile);
    setPreview(previewUrl);
    onSave?.(croppedImageFile);
    setOpenCrop(false);
  };

  return (
    <>
      <Box position="relative" width={100} height={100}>
        {!viewOnly ? (
          <>
            <input
              accept="image/*"
              type="file"
              id="avatar-input"
              hidden
              onChange={onFileChange}
            />
            <label htmlFor="avatar-input" style={{ cursor: "pointer" }}>
              <Avatar
                src={preview}
                sx={{
                  width: 100,
                  height: 100,
                  border: "2px solid #ccc",
                }}
                {...rest}
              />
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  bgcolor: "background.paper",
                  borderRadius: "50%",
                  boxShadow: 2,
                  "&:hover": { bgcolor: "grey.500" },
                }}
                component="span"
                aria-label="edit avatar"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </label>
          </>
        ) : (
          <Avatar
            src={preview}
            sx={{
              width: 100,
              height: 100,
              border: "2px solid #ccc",
            }}
            {...rest}
          />
        )}
      </Box>

      <Dialog
        open={openCrop}
        onClose={() => setOpenCrop(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Crop Image</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: 300,
              bgcolor: "#333",
            }}
          >
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </Box>
          <Box mt={2}>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(_, value) => setZoom(value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCrop(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleCropSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

AvatarUpload.propTypes = {
  avatar: PropTypes.string.isRequired,
  onSave: PropTypes.func,
  viewOnly: PropTypes.bool,
};

export default AvatarUpload;
