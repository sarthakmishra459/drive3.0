import React, { createContext, useContext, useState } from "react";

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState("");

    return (
        <AccountContext.Provider value={{ account, setAccount }}>
            {children}
        </AccountContext.Provider>
    );
};

export const useAccount = () => {
    const context = useContext(AccountContext);
    if (!context) {
        throw new Error("useAccount must be used within an AccountProvider");
    }
    return context;
};
