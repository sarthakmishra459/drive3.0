import React from 'react'
import Layout from '../components/Layout'
import { useEffect, useState } from "react";
import { Web3Provider } from "@ethersproject/providers";
import Upload from "../artifacts/contracts/Upload.sol/Upload.json";
import Display from '../components/Display';
import { Contract } from "ethers";
import { useRef } from "react";
import { useAccount } from "../contexts/AccountContext";
import axios from "axios";

const Documents = () => {
  const [Data, setData] = useState('doc')
  const { account, setAccount } = useAccount();
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const fileInputRef = useRef(null);
  useEffect(() => {
    // Function to load the provider and set contract
    setData('doc')
    const loadProvider = async () => {
      try {
        // Create a Web3Provider from window.ethereum
        const provider = new Web3Provider(window.ethereum);

        // Add event listeners for chain changes and account changes
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        // Request user accounts
        const accounts = await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();

        // Set account
        //setAccount(address);

        // Set contract address
        const contractAddress = "0x5D2C667f113ab8fad4425255800f3e313a095CA5";

        // Create Contract instance
        const contract = new Contract(contractAddress, Upload.abi, signer);

        // Set contract and provider
        setContract(contract);
        setProvider(provider);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    // Check if window.ethereum is available
    if (window.ethereum) {
      loadProvider(); // Call the loadProvider function
    } else {
      console.error("Metamask is not installed");
    }
  }, []);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `55da57598a16dd6bebf4`,
            pinata_secret_api_key: `3ffacc7a93fe402bf0a1c45d3ea41bcbb40c4cdd44f0aec3a3ea7971fee12e31`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        contract.add(account, ImgHash);
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {
        alert("Unable to upload image to Pinata");
      }
    }
    alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };
  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };
  const handleAddFileClick = () => {
    // Trigger the click event of the hidden file input
    fileInputRef.current.click();
  };
  return (
    <Layout>
      <div className="container mx-auto flex items-center justify-between">
        {/* Website Title */}
        <h1 className="text-white text-2xl font-bold">Drive 3.0</h1>

        {/* Navbar Icons */}
        <div className="flex items-center">
          {/* Metamask Login */}
          <button
            className="bg-darkblue hover:bg-violet text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {
              setAccount(!account);
            }}
          >
            {account ? "Logout" : "Login with Metamask"}
          </button>


        </div>

      </div>

      {/*Display */}

      <div>
        {account ? <Display contract={contract} account={account} data={Data} /> : null}
      </div>
    </Layout>
  )
};

export default Documents;
