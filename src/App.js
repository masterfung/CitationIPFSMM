import { useState, useEffect, useCallback } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import "./App.css";

const App = () => {
  const [injectedProvider, setInjectedProvider] = useState();
  const [address, setAddress] = useState("");
  const [chainId, setChainId] = useState();
  const [walletConnected, setWalletConnected] = useState(false);

  const connectWallet = useCallback(async () => {
    const provider = await web3Modal.connect();
    const injectedProvider = new ethers.providers.Web3Provider(provider);
    setInjectedProvider(injectedProvider);
    const signer = injectedProvider.getSigner();
    const address = await signer.getAddress();
    setAddress(address);
    const balance = Number(
      ethers.utils.formatEther(await signer.getBalance())
    ).toFixed(2);
    const chainId = await signer.getChainId();
    setChainId(chainId);
    console.log("SIGNER :", signer);
    console.log("ADDRESS :", address);
    console.log("BALANCE :", balance);
    console.log("CHAIN ID :", chainId);
    setWalletConnected(true);
  }, []);

  useEffect(() => {
    function init() {
      if (web3Modal.cachedProvider) {
        connectWallet();
      }
    }
    init();
  }, [connectWallet]);

  return (
    <div className="wrapper">
      <hr />
      <div className="main">
        <h4>
          <i>Network</i>
        </h4>
        <p>
          {" "}
          {chainId === 1
            ? "Mainnet"
            : chainId === 3
            ? "Ropsten"
            : chainId === 4
            ? "Rinkeby"
            : chainId === 42
            ? "Kovan"
            : ""}
        </p>
        <br />
        <h4>
          <i>Address</i>
        </h4>
        <p>
          {address.substr(0, 5) + "..." + address.slice(address.length - 5)}
        </p>
      </div>
    </div>
  );
};

export default App;

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: process.env.REACT_APP_INFURA_API_KEY,
      },
    },
  },
  theme: "dark",
});

