import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function Appbar() {
  return (
    <Box sx={{ flexGrow: 1 }} padding={1}>
      <AppBar position="static" sx={{}}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          padding={1}
          justifyContent="center"
        >
          DECENTRALIZED NFT MARKETPLACE
        </Typography>
      </AppBar>
    </Box>
  );
}
