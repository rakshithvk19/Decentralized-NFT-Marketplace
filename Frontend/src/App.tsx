import Container from "@mui/material/Container";
import NFTGallery from "./components/NFTGallery";

import { WagmiWrapper } from "./components/WagmiWrapper";
import { MintNFT } from "./components/MintNFT";

const App: React.FC = () => {
  return (
    <div>
      <Container>
        <WagmiWrapper>
          <MintNFT />
          <NFTGallery />
        </WagmiWrapper>
      </Container>
    </div>
  );
};

export default App;
