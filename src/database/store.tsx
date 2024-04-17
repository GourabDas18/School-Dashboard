import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

interface child {
    children : ReactNode
}
type storeValueType={
    menuOpen : boolean;
    menuChange : (e:boolean)=>void
}

const store = createContext<storeValueType|null>(null);

export const StoreWrap=({children}:child)=>{
    const[menuOpen, setMenuOpen] = useState<boolean>(true);
    const menuChange=(e:boolean)=>{
        setMenuOpen(e)
    }
    return(
        <store.Provider value={{menuOpen,menuChange}} >
            {children}
        </store.Provider>
    )
}

export const useStoreWrap = ()=>{
    const useStore = useContext(store);
    if(useStore){
        return useStore;
    }else{
        throw new Error("Data not defined on store");
    }

}