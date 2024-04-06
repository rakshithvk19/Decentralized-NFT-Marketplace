import { Container } from "@mui/system";
import { Appbar } from "./components/Appbar";
import { NFTList } from "./components/NFTList";
import Box from "@mui/material/Box";

import { WagmiWrapper } from "./components/WagmiWrapper";

function App() {
  return (
    <div>
      <Appbar />
      <Container>
        <WagmiWrapper>
          <Box display={"flex"} justifyContent={"center"}>
            <NFTList />
          </Box>
        </WagmiWrapper>
      </Container>
    </div>
  );
}

export default App;
