import React, { useEffect, useState } from "react";


const Display = ({ contract, account, data }) => {
    const [files, setFiles] = useState([]);
    const [addr, setaddr] = useState(null);


    const getdata = async () => {
        let dataArray;
        const otherAddress = document.querySelector(".address").value;
        console.log(data)
        try {
            if (otherAddress) {
                dataArray = await contract.display(otherAddress);
                console.log("dataArray1 Called")
                setaddr(otherAddress)
            } else {
                dataArray = await contract.display(account);

                setaddr(account)
                console.log("dataArray2 Called")
                console.log(account)
            }
        } catch (e) {
            console.log("You don't have access", e);
            return;
        }

        const isEmpty = Object.keys(dataArray).length === 0;

        if (!isEmpty) {
            const str = dataArray.toString();
            const str_array = str.split(",");
            const filesData = await Promise.all(
                str_array.map(async (item, i) => {
                    const fileName = item.substring(item.lastIndexOf("/") + 1);
                    const fileExtension = fileName.split(".").pop().toLowerCase();

                    const fileUrl = item;
                    const parts = fileUrl.split("ipfs/");
                    const afterIpfs = parts[1];
                    const url =
                        'https://scarlet-clinical-meadowlark-489.mypinata.cloud/ipfs/' +
                        afterIpfs +
                        '?pinataGatewayToken=1QzxJImJOBlxVEJXcKOqEJIpjQ9mJ7-mn-M2Ot0_AmI4oVqRg7OiTDwm30kfbYFC&_gl=1*1ktqv94*_ga*MjI3Njk4MjkyLjE2OTI3OTczMDc.*_ga_5RMPXG14TE*MTcwNDYyMTMwMy45LjEuMTcwNDYyMTM4Ny40OS4wLjA';
                    console.log(url)
                    const fetchFileType = async (url) => {
                        try {
                            const response = await fetch(url, { method: 'HEAD' });
                            const contentType = response.headers.get('content-type');

                            if (contentType.startsWith('audio')) {
                                return 'audio';
                            } else if (contentType.startsWith('video')) {
                                return 'video';
                            } else if (contentType.startsWith('image')) {
                                return 'image';
                            } else if (contentType.startsWith('application/pdf')) {
                                return 'pdf';
                            } else if (contentType.startsWith('application/docx')) {
                                return 'doc';
                            } else {
                                return 'unknown';
                            }
                        } catch (error) {
                            console.error('Error fetching resource:', error);
                            return 'error';
                        }
                    };

                    const fileType = await fetchFileType(url);

                    return {
                        fileName: `File ${i + 1}`,
                        fileType: fileType,
                        fileUrl: url
                    };
                })
            );

            setFiles(filesData);
        } else {
            alert("No files to display");
        }
    };
    useEffect(() => {
        if (account) {
            getdata();
        }


        // Call the getdata function when component mounts or dependencies change
    }, [contract, account, data]);



    return (
        <>
            <div className="flex flex-col items-center min-h-screen  mt-8">
                <div className="flex items-center p-2 mx-6 mt-4">
                    <input
                        type="text"
                        placeholder="Enter Address"
                        className="address p-2 border text-text-lights cursor-text rounded-md focus:outline-none focus:border-blue-500"
                    />

                    <button
                        className="button bg-blue-500 border-2 hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded-full ml-4"
                        onClick={getdata}
                    >
                        Get Data
                    </button>
                </div>

                {/* Display data in a table */}
                <div className=" bg-white rounded-lg  text-slate-950 items-center flex flex-col justify-center mt-8">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden  border-2 border-light md:rounded-lg">
                                <table className="min-w-full divide-y divide-black">
                                    <thead className="bg-green-500 text-black">
                                        <tr>
                                            <th scope="col" className="px-4 py-3.5 text-left text-text-light text-md   font-bold">
                                                <span>File Name</span>
                                            </th>
                                            <th scope="col" className="px-12 py-3.5 text-left text-text-light text-md font-bold">
                                                File Type
                                            </th>
                                            <th scope="col" className="px-12 py-3.5 text-left text-text-light text-md font-bold ">
                                                View
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-black bg-gray-50">
                                        {files.map((file, index) => {
                                            // Condition to check if data is 'media' and fileType is audio or video
                                            const shouldRenderRow =
                                                (data === 'media' && (file.fileType === 'audio' || file.fileType === 'video')) ||
                                                (data === 'doc' && (file.fileType === 'pdf' || file.fileType === 'doc')) ||
                                                (data === 'home') ||
                                                (data === 'image' && file.fileType === 'image');

                                            return shouldRenderRow ? (
                                                <tr key={index}>
                                                    <td className="whitespace-nowrap px-4 py-4">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div className="text-md font-bold text-black">{file.fileName}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-14 py-6 text-sm font-medium">
                                                        <span className="text-black text-md  font-bold">{file.fileType}</span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-8 py-4 text-sm font-medium">
                                                        <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" className="bg-blue rounded-xl  hover:bg-violet text-white font-bold py-2 px-4  inline-block">
                                                            View
                                                        </a>
                                                    </td>
                                                </tr>
                                            ) : null;
                                        })}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
};

export default Display;