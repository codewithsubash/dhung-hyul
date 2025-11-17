import { DeleteForever } from "@mui/icons-material";
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { useDropzone } from "react-dropzone";

import { useState } from "react";

import { BASE_CONSTANTS } from "../../constants/baseConstant";
import { LoadingButton } from "./LoadingButton";
import { useCloudinaryFileDeleteMutation } from "../../store/services/cloudinaryUploadApi";

const FileDropzone = ({
  files = { existingFiles: [], newFiles: [] },
  onFileChange = () => {},
  maxFileSizeInMB = 5,
  multiple = false,
  error = false,
  helperText = "",
  showError = false,
  triggerValidation,
}) => {
  const [fileErrors, setFileErrors] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [fileType, setFileType] = useState(null);

  const handleOpen = (index, type) => {
    setDeleteIndex(index);
    setFileType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFileType(null);
  };

  const BYTES_TO_MB = 1048576;

  const { getRootProps, getInputProps } = useDropzone({
    multiple,
    maxSize: maxFileSizeInMB * BYTES_TO_MB,
    onDrop: (acceptedFiles) => {
      setFileErrors([]);
      const updatedFiles = {
        existingFiles: multiple ? [...files.existingFiles] : [],
        newFiles: multiple
          ? [...files.newFiles, ...acceptedFiles]
          : acceptedFiles,
      };
      onFileChange(updatedFiles);
      triggerValidation();
    },
    onDropRejected: (rejectedFiles) => {
      const _mappedErrors = rejectedFiles.map((file) => ({
        fileName: file.file.name,
        error: file.errors[0].message,
      }));
      setFileErrors(_mappedErrors);
    },
  });

  const [deleteFile, { isLoading: isDeleting }] =
    useCloudinaryFileDeleteMutation();

  const handleRemoveFile = async () => {
    const fileToRemove =
      fileType === "existing"
        ? files.existingFiles[deleteIndex]
        : files.newFiles[deleteIndex];

    try {
      if (fileType === "existing") {
        await deleteFile({ publicId: fileToRemove.publicId });
      }

      const updatedFiles = {
        existingFiles:
          fileType === "existing"
            ? files.existingFiles.filter((_, index) => index !== deleteIndex)
            : files.existingFiles,
        newFiles:
          fileType === "new"
            ? files.newFiles.filter((_, index) => index !== deleteIndex)
            : files.newFiles,
      };

      onFileChange(updatedFiles);
      triggerValidation();
    } catch (e) {
    } finally {
      handleClose();
    }
  };

  const localError =
    (files.existingFiles.length === 0 && files.newFiles.length === 0) || error;

  return (
    <div className="grid grid-cols-1 gap-2">
      <div
        {...getRootProps({ className: "dropzone" })}
        className="grid h-28 grid-cols-1 place-content-center rounded border-2 border-dashed bg-gray-50 p-4 text-center dark:bg-slate-800"
      >
        <input {...getInputProps()} className="hidden" />
        <div>Drag 'n' drop a file here, or click to select a file</div>
      </div>

      {(helperText || (localError && showError)) && (
        <Box paddingX={BASE_CONSTANTS.SPACING_SM}>
          <FormHelperText error>
            {helperText || "File is required."}
          </FormHelperText>
        </Box>
      )}

      <div className="text-sm text-gray-500 dark:text-gray-200">
        <span className="text-xs">Max size/file: {maxFileSizeInMB}MB</span>
      </div>

      <div>
        {files.newFiles.length > 0 && (
          <div>
            <Typography variant="subtitle1" gutterBottom>
              New Files
            </Typography>
            <ul>
              {files.newFiles.map((file, index) => (
                <li key={file.name + index}>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-green-500 line-clamp-1 dark:text-green-200">
                      {file.name || file.originalname}
                    </div>
                    <IconButton
                      size="small"
                      onClick={() => handleOpen(index, "new")}
                    >
                      <DeleteForever fontSize="small" color="error" />
                    </IconButton>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {files.existingFiles.length > 0 && (
          <div>
            <Typography variant="subtitle1" gutterBottom>
              Existing Files
            </Typography>
            <ul>
              {files.existingFiles.map((file, index) => (
                <li key={file.name + index}>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-green-500 line-clamp-1 dark:text-green-200">
                      {file.name || file.originalname}
                    </div>
                    <IconButton
                      size="small"
                      onClick={() => handleOpen(index, "existing")}
                    >
                      <DeleteForever fontSize="small" color="error" />
                    </IconButton>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!!fileErrors.length && (
          <ul>
            {fileErrors.map((fe, index) => (
              <li
                key={fe.fileName + index}
                className="text-red-500 dark:text-red-200"
              >
                <div className="text-sm">
                  <span>{fe.fileName}</span> - <span>{fe.error}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <DeleteConfirmationModal
        handleRemoveFile={handleRemoveFile}
        handleClose={handleClose}
        open={open}
        isDeleting={isDeleting}
      />
    </div>
  );
};

const DeleteConfirmationModal = ({
  handleRemoveFile,
  handleClose,
  open,
  isDeleting,
}) => {
  const style = {
    position: "absolute",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 2,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <p>Are you sure you want to delete this file?</p>
        <Box className="ml-auto">
          <Button variant="outlined" onClick={handleClose}>
            No
          </Button>
          <LoadingButton
            loading={isDeleting}
            variant="contained"
            onClick={handleRemoveFile}
          >
            Yes
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default FileDropzone;
