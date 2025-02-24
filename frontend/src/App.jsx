import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import 'react-quill/dist/quill.snow.css';
import 'react-circular-progressbar/dist/styles.css';
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-datetime/css/react-datetime.css";
import NavigationProvider from './provider/navigationProvider';
import SideBarToggleProvider from './provider/sideBarToggleProvider';
import ThemeCustomizer from './components/shared/ThemeCustomizer';

const App = () => {
    return (
        <>
            <NavigationProvider>
                <SideBarToggleProvider>
                    <RouterProvider router={router} />
                </SideBarToggleProvider>
            </NavigationProvider>
            <ThemeCustomizer />
        </>
    )
}

export default App