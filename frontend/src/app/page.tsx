import { WagmiWrapper } from "./WagmiWrapper";
import { DisplayCollection } from "./DisplayCollection";
import { Container, Paper } from "@mui/material";
import { Height } from "@mui/icons-material";
export default function Home() {
  return (
    <main>
      <WagmiWrapper>
        <Container>
          <Paper
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              height: "80vh",
            }}
          >
            <DisplayCollection />
          </Paper>
        </Container>
      </WagmiWrapper>
    </main>
  );
}
