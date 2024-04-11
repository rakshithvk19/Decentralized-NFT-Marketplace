import NFTUploader from "./components/NFTUploader";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import NFTGallery from "./components/NFTGallery";

import { WagmiWrapper } from "./components/WagmiWrapper";
import { MintNFT } from "./components/MintNFT";
import { SendTransaction } from "./components/Send-Transaction";
import TestWriteContract from "./components/TestWriteContract";

const App: React.FC = () => {
  return (
    <div>
      <Container>
        <WagmiWrapper>
          <MintNFT />
          <NFTUploader />
          <Box display={"flex"} justifyContent={"center"}>
            <NFTList />
          </Box>
          <NFTGallery />
        </WagmiWrapper>
      </Container>
    </div>
  );
};

export default App;
