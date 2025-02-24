import React, {useState} from 'react';
import {NavigationContext as NavigationContext1} from "./navigationContext";

const NavigationProvider = ({ children }) => {
    const [navigationOpen, setNavigationOpen] = useState(false)
    const [navigationExpend, setNavigationExpend] = useState(false)

    const obj = {
        navigationOpen,
        setNavigationOpen,
        navigationExpend,
        setNavigationExpend
    }

    return (
        <NavigationContext1 value={obj}>
            {children}
        </NavigationContext1>
    );
};

export default NavigationProvider