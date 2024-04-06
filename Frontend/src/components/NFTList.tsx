import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const itemData = [
  {
    img: "https://gray-passive-chicken-829.mypinata.cloud/ipfs/Qmazb8vUP747ow3Di9QLQ3n5mzgWAeXP4RScy5oQbQyftY?pinataGatewayToken=n-oC6-uUw-e3PtBHio9Jexzq2pBjeuAsGA-3GQSkpjAuAELx8JGWHqaOSDVTz6B9",
    title: "Breakfast",
  },
  {
    img: "https://gray-passive-chicken-829.mypinata.cloud/ipfs/Qmazb8vUP747ow3Di9QLQ3n5mzgWAeXP4RScy5oQbQyftY?pinataGatewayToken=n-oC6-uUw-e3PtBHio9Jexzq2pBjeuAsGA-3GQSkpjAuAELx8JGWHqaOSDVTz6B9",
    title: "Burger",
  },
  {
    img: "https://gray-passive-chicken-829.mypinata.cloud/ipfs/Qmazb8vUP747ow3Di9QLQ3n5mzgWAeXP4RScy5oQbQyftY?pinataGatewayToken=n-oC6-uUw-e3PtBHio9Jexzq2pBjeuAsGA-3GQSkpjAuAELx8JGWHqaOSDVTz6B9",
    title: "Camera",
  },
  {
    img: "https://gray-passive-chicken-829.mypinata.cloud/ipfs/Qmazb8vUP747ow3Di9QLQ3n5mzgWAeXP4RScy5oQbQyftY?pinataGatewayToken=n-oC6-uUw-e3PtBHio9Jexzq2pBjeuAsGA-3GQSkpjAuAELx8JGWHqaOSDVTz6B9",
    title: "Coffee",
  },
  {
    img: "https://gray-passive-chicken-829.mypinata.cloud/ipfs/Qmazb8vUP747ow3Di9QLQ3n5mzgWAeXP4RScy5oQbQyftY?pinataGatewayToken=n-oC6-uUw-e3PtBHio9Jexzq2pBjeuAsGA-3GQSkpjAuAELx8JGWHqaOSDVTz6B9",
    title: "Hats",
  },
  {
    img: "https://gray-passive-chicken-829.mypinata.cloud/ipfs/Qmazb8vUP747ow3Di9QLQ3n5mzgWAeXP4RScy5oQbQyftY?pinataGatewayToken=n-oC6-uUw-e3PtBHio9Jexzq2pBjeuAsGA-3GQSkpjAuAELx8JGWHqaOSDVTz6B9",
    title: "Honey",
  },
  {
    img: "https://gray-passive-chicken-829.mypinata.cloud/ipfs/Qmazb8vUP747ow3Di9QLQ3n5mzgWAeXP4RScy5oQbQyftY?pinataGatewayToken=n-oC6-uUw-e3PtBHio9Jexzq2pBjeuAsGA-3GQSkpjAuAELx8JGWHqaOSDVTz6B9",
    title: "Basketball",
  },
  {
    img: "https://gray-passive-chicken-829.mypinata.cloud/ipfs/Qmazb8vUP747ow3Di9QLQ3n5mzgWAeXP4RScy5oQbQyftY?pinataGatewayToken=n-oC6-uUw-e3PtBHio9Jexzq2pBjeuAsGA-3GQSkpjAuAELx8JGWHqaOSDVTz6B9",
    title: "Fern",
  },
  {
    img: "https://gray-passive-chicken-829.mypinata.cloud/ipfs/Qmazb8vUP747ow3Di9QLQ3n5mzgWAeXP4RScy5oQbQyftY?pinataGatewayToken=n-oC6-uUw-e3PtBHio9Jexzq2pBjeuAsGA-3GQSkpjAuAELx8JGWHqaOSDVTz6B9",
    title: "Mushrooms",
  },
  {
    img: "https://gray-passive-chicken-829.mypinata.cloud/ipfs/Qmazb8vUP747ow3Di9QLQ3n5mzgWAeXP4RScy5oQbQyftY?pinataGatewayToken=n-oC6-uUw-e3PtBHio9Jexzq2pBjeuAsGA-3GQSkpjAuAELx8JGWHqaOSDVTz6B9",
    title: "Tomato basil",
  },
  {
    img: "https://gray-passive-chicken-829.mypinata.cloud/ipfs/Qmazb8vUP747ow3Di9QLQ3n5mzgWAeXP4RScy5oQbQyftY?pinataGatewayToken=n-oC6-uUw-e3PtBHio9Jexzq2pBjeuAsGA-3GQSkpjAuAELx8JGWHqaOSDVTz6B9",
    title: "Sea star",
  },
  {
    img: "https://gray-passive-chicken-829.mypinata.cloud/ipfs/Qmazb8vUP747ow3Di9QLQ3n5mzgWAeXP4RScy5oQbQyftY?pinataGatewayToken=n-oC6-uUw-e3PtBHio9Jexzq2pBjeuAsGA-3GQSkpjAuAELx8JGWHqaOSDVTz6B9",
    title: "Bike",
  },
];

export function NFTList() {
  return (
    <ImageList sx={{ width: 600, height: 600 }} cols={3} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.img} sx={{ margin: 0.5 }}>
          <img src={`${item.img}`} alt={item.title} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
