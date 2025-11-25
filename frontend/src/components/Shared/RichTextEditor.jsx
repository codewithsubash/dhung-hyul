import React from "react";
import { Box, FormHelperText } from "@mui/material";
import { Editor } from "@tinymce/tinymce-react";

const DEFAULT_CONFIG = {
  plugins: [
    "advlist", // Advanced list options
    "autolink",
    "lists", // Required for bullet/numbered lists
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "code",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "help",
    "wordcount",
  ],
  toolbar:
    "undo redo | blocks fontsize | " +
    "bold italic forecolor backcolor | " +
    "alignleft aligncenter alignright alignjustify | " +
    "bullist numlist outdent indent | " +
    "removeformat | help",
  fontsize_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt",
  menubar: false,
};

const RichTextEditor = ({
  initialValue = "<p>Start typing...</p>",
  onChange = () => {},
  height = 400,
  menubar = false,
  error = false,
  helperText = "",
  darkMode = false,
}) => {
  const editorRef = React.useRef(null);

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
        tinymceScriptSrc={
          "https://cdnjs.cloudflare.com/ajax/libs/tinymce/7.1.1/tinymce.min.js"
        }
        onEditorChange={onChange}
        initialValue={initialValue}
        init={initObject}
      />
      {helperText && (
        <Box paddingX={1.5} paddingTop={0.5}>
          <FormHelperText error={error}>{helperText}</FormHelperText>
        </Box>
      )}
    </>
  );
};

export default RichTextEditor;
