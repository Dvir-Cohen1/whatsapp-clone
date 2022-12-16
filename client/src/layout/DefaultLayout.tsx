import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import AppWrapper from "../components/AppWrapper";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import Navbar from "./Navbar";
const DefaultLayout = () => {
     return (
          <>
               <Suspense fallback={<h1>Loading..</h1>}>
                    <AppWrapper>
                         <Sidebar />
                         <MainContent >
                              <Outlet />
                         </MainContent>
                    </AppWrapper>
               </Suspense>
          </>
     )
}

export default DefaultLayout