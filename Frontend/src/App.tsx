import NFTUploader from "./components/NFTUploader";
import Container from "@mui/material/Container";

import { WagmiWrapper } from "./components/WagmiWrapper";
import { MintNFT } from "./components/MintNFT";
import { SendTransaction } from "./components/Send-Transaction";
import TestWriteContract from "./components/TestWriteContract";

const App: React.FC = () => {
  return (
    <div>
      <Container>
        <WagmiWrapper>
          {/* <NFTUploader /> */}
          <MintNFT />
          {/* <SendTransaction /> */}
          {/* <TestWriteContract /> */}
        </WagmiWrapper>
      </Container>
    </div>
  );
};

export default App;
