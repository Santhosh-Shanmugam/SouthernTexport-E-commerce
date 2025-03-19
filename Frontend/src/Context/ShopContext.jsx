import React from "react";
import { createContext } from "react";
export const ShopContext = createContext(null);
import Data  from "../assets/Data";

const ShopContextProvider = (props) =>{
    const contextValue = {Data};
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )

}
export default ShopContextProvider;