import { http, createConfig } from "@wagmi/core";
import { sepolia } from "@wagmi/core/chains";
import { injected } from "@wagmi/core";

export const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
  connectors: [injected()],
});
