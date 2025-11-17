// Replace 'doFileUpload' mutation with 'cloudinaryFileUploadMutation' (update your RTK Query/whatever generates it)
// Assume you have: const [cloudinaryFileUpload, { isLoading: uploadingFiles, error }] = useCloudinaryFileUploadMutation();

import { useCloudinaryFileUploadMutation } from "../store/services/cloudinaryUploadApi";

export const useCloudinaryUploadFile = () => {
  const [cloudinaryFileUpload, { isLoading: uploadingFiles, error }] =
    useCloudinaryFileUploadMutation(); // Update this import/mutation name

  async function handleUploadFiles(
    files,
    options = { folderName: "" } // Removed 'account'—not needed
  ) {
    console.log(files, "files");
    if (!options.folderName) throw new Error("Upload Options not satisfied!"); // Still require entity for path prefix

    if (!files?.length) return [];

    const uploadedFiles = [];

    for (const file of files) {
      if (file instanceof File)
        try {
          const filePath = `${options.folderName}`;

          const upload = await cloudinaryFileUpload({
            // Update mutation name
            filePath,
            file: file,
          }).unwrap();

          const data = {
            name: upload.name,
            type: upload.type,
            size: upload.size,
            publicId: upload.publicId, // Full path like "user123/BLOGS/1234567890.jpg"
            secureUrl: upload.secureUrl, // Use secure_url for HTTPS
          };
          uploadedFiles.push(data);
        } catch (err) {
          throw err;
        }
    }

    return {
      uploadedFiles,
    };
  }

  return {
    handleUploadFiles,
    uploadingFiles,
    error,
  };
};
