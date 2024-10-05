import React, { createContext, useState } from 'react';

const ContextApi = createContext();

const ContextProvider = ({ children }) => {
    const [refresh, setRefresh] = useState(false);

    return (
        <ContextApi.Provider value={{ refresh, setRefresh }}>
            {children}
        </ContextApi.Provider>
    );
};

export { ContextApi, ContextProvider };