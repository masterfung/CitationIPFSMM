import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { Nav } from "react-bootstrap";

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

window.ethereum &&
  window.ethereum.on("chainChanged", (chainId) => {
    web3Modal.cachedProvider &&
      setTimeout(() => {
        window.location.reload();
      }, 1000);
  });

window.ethereum &&
  window.ethereum.on("accountsChanged", async (accounts) => {
    if (accounts.length === 0) {
      await web3Modal.clearCachedProvider();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    web3Modal.cachedProvider &&
      setTimeout(() => {
        window.location.reload();
      }, 1000);
  });

const Layout = () => {
  const [injectedProvider, setInjectedProvider] = useState();
  const [address, setAddress] = useState("");
  const [chainId, setChainId] = useState();
  const [walletConnected, setWalletConnected] = useState(false);
  const navigate = useNavigate();

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

  const disconnectWallet = async () => {
    await web3Modal.clearCachedProvider();
    setTimeout(() => {
      setWalletConnected(false);
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <h1>Citation IPFS</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/contribute">Blogs</Link>
          </li>
          <li>
            <Link to="/example">Example</Link>
          </li>
          {!walletConnected ? (
            <>
              <button className="btn" onClick={connectWallet}>
                Connect Wallet
              </button>
            </>
          ) : (
            <>
              <button className="btn" onClick={disconnectWallet}>
                Disconnect Wallet
              </button>
              <button className="btn" onClick={() => navigate("/contribute")}>
                Contribute
              </button>
            </>
          )}
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
