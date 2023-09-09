import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { createConfig, configureChains, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { mainnet } from "wagmi/chains";
import { MessageContextProvider } from "./context/MessageContext";
import { SetAuthContextProvider } from "./context/SetAuthContext";
import { SetContractContextProvider } from "./context/SetContractContext";
import { GetContractContextProvider } from "./context/GetContractContext";

const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <WagmiConfig config={config}>
      <MessageContextProvider>
        <SetAuthContextProvider>
          <SetContractContextProvider>
            <GetContractContextProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </GetContractContextProvider>
          </SetContractContextProvider>
        </SetAuthContextProvider>
      </MessageContextProvider>
    </WagmiConfig>
  </StrictMode>
);
