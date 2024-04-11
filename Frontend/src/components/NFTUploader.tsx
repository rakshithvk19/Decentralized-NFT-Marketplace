// src/components/NFTUploader.tsx
import FileUpload from "./FileUpload";
import MetadataViewer from "./MetadataViewer";
import useFileSubmission from "../hooks/useFileSubmission";
import useMetadataProcessing from "../hooks/useMetadataProcessing";
import styles from "./NFTUploader.module.css"; // Ensure this points to your CSS module

const NFTUploader: React.FC = () => {
  const { handleFileChange, handleSubmission, cid } = useFileSubmission();
  const { handleProcess, metadata } = useMetadataProcessing();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>IPFS File Upload and Metadata Generation</h1>
      </div>
      <FileUpload onFileChange={handleFileChange} />
      <div className={styles.buttons}>
        <button onClick={handleSubmission}>Submit</button>
        <button onClick={() => handleProcess(cid)}>Process Metadata</button>
      </div>
      {/* {cid && (
        <img
          className={styles.image}
          src={`https://ipfs.io/ipfs/${cid}`}
          alt="Uploaded IPFS Image"
        />
      )}
      <div className={styles.metadata}>
        <MetadataViewer metadata={metadata} />
      </div> */}
    </div>
  );
};

export default NFTUploader;
