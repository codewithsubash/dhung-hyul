import { Box, FormHelperText } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";
import React from "react";
import { useSidebarLayoutContext } from "../SidebarLayout/context/SidebarLayoutContext";
import { BASE_CONSTANTS } from "../../constants/baseConstant";

const DEFAULT_CONFIG = {
  plugins: [
    "advlist autolink lists link image charmap print preview anchor",
    "searchreplace visualblocks code fullscreen",
    "insertdatetime media table paste code help wordcount",
  ],
  toolbar:
    "undo redo | formatselect | " +
    "bold italic backcolor | alignleft aligncenter " +
    "alignright alignjustify | bullist numlist outdent indent | " +
    "removeformat | help",
  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
};

const RichTextEditor = ({
  initialValue,
  onChange,
  height = 200,
  menubar = false,
  error = false,
  helperText = "",
}) => {
  const editorRef = React.useRef(null);

  const { darkMode } = useSidebarLayoutContext();

  const initObject = React.useMemo(
    () => ({
      ...DEFAULT_CONFIG,
      height,
      menubar,
      ...(darkMode && {
        skin: "oxide-dark",
        content_css: "dark",
      }),
    }),
    [darkMode, height, menubar]
  );

  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        // apiKey={TINY_CLOUD_API_KEY}
        tinymceScriptSrc={
          "https://cdnjs.cloudflare.com/ajax/libs/tinymce/7.1.1/tinymce.min.js"
        }
        onEditorChange={onChange}
        initialValue={initialValue}
        init={initObject}
      />
      {helperText && (
        <Box paddingX={BASE_CONSTANTS.SPACING_SM}>
          <FormHelperText {...{ error }}>{helperText}</FormHelperText>
        </Box>
      )}
    </>
  );
};

export default RichTextEditor;
