import { ChangeEvent } from "react";
import styles from "./FileUpload.module.css";

interface FileUploadProps {
  onFileChange: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFileChange(event.target.files[0]);
    }
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
    </div>
  );
};

export default FileUpload;
