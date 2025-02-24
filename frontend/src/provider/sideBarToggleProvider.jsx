import React, {useState} from 'react'
import {SidebarContext as SidebarContext1} from "./sidebarContext";

const SideBarToggleProvider = ({children}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <SidebarContext1 value={{sidebarOpen, setSidebarOpen}}>
            {children}
        </SidebarContext1>
    )
}

export default SideBarToggleProvider