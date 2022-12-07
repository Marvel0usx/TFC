import {BrowserRouter, Route, Routes} from "react-router-dom";
import Signup from "../User/Signup";
import Navbar from "../UI/Navbar";

const SignupRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Navbar/> }>
                    <Route path="accounts/register/" element={<Signup />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
