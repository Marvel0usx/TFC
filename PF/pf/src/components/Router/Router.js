import {BrowserRouter, Route, Routes} from "react-router-dom";
import ClassList from "../Studios/ClassList";
import ClassView from "../Studios/ClassView";
import StudioList from "../Studios/StudioList"
import StudioView from "../Studios/StudioView";
import Navbar from "../UI/Navbar";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Navbar/> }>
                    <Route path="studios" element={<StudioList />} />
                    <Route path="studios/:studioID" element={<StudioView />} />
                    <Route path="studios/class/:classID/view" element={<ClassView />} />
                    <Route path="studios/class/" element={<ClassList />} />
                    <Route path="schedule"/>
                    <Route path="history"/>
                    <Route path="logout"/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
