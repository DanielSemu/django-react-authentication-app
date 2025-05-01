
import AppRoutes from "./routes/AppRoutes";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      
         <Routes>
            
            {/* <Route path="/login" element={<Login/>}/> */}
            <Route path="/*" element={<AppRoutes/>}/>
         </Routes>
  
    </>
  );
};

export default App;
