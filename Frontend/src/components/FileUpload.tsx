import { ChangeEvent } from "react";
import styles from "./FileUpload.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

interface FileUploadProps {
  onFileChange: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFileChange(event.target.files[0]);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    // Handle the file here
  };

  return (
    <div className={styles.fileUploadContainer}>
      <label className={styles.formLabel} htmlFor="file-upload">
        Choose File
      </label>
      <input
        id="file-upload"
        className={styles.fileInput}
        type="file"
        onChange={handleChange}
      />
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleFileChange}
      />
    </div>

    // <>
    // <Box display={"flex"} flexDirection={"column"} rowGap={1}>
    //   <label htmlFor="raised-button-file">
    //     <Button variant="contained" component="span">
    //       Upload
    //     </Button>
    //   </label>
    //   <TextField id="outlined-basic" label="NFT Name" variant="outlined" />
    //   <TextField
    //     id="outlined-basic"
    //     label="NFT Description"
    //     variant="outlined"
    //     multiline
    //     minRows={2}
    //     />
    // </Box>
    //     </>
  );
};

export default FileUpload;
