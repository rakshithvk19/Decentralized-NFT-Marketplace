// src/App.tsx
import NFTUploader from "./components/NFTUploader";
import { Container } from "@mui/system";
import { Appbar } from "./components/Appbar";
import { NFTList } from "./components/NFTList";
import Box from "@mui/material/Box";
import NFTGallery from "./components/NFTGallery";

import { WagmiWrapper } from "./components/WagmiWrapper";

const App: React.FC = () => {
  return (
    <div>
      <Appbar />
      <Container>
        <WagmiWrapper>
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
