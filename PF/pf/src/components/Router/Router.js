import {BrowserRouter, Route, Routes} from "react-router-dom";
import { Home } from "../Home/Home";
import ClassList from "../Studios/ClassList";
import ClassView from "../Studios/ClassView";
import StudioList from "../Studios/StudioList"
import StudioView from "../Studios/StudioView";
import History from "../Studios/UserHistory";
import Schedule from "../Studios/UserSchedule";
import Navbar from "../UI/Navbar";

import SubscriptionPlansList from "../Subscription/SubscriptionPlans";
import CurrentSubscription from "../Subscription/SubscriptionHistory";
import CancelSubscription from "../Subscription/SubscriptionCancel";
import CancelledSubscription from "../Subscription/SubscriptionCancelled";
import CreateSubscription from "../Subscription/SubscriptionCreate";
import UpdateSubscription from "../Subscription/SubscriptionUpdate";
import PaymentHistory from "../Payment/PaymentHistory";
import ViewCardInfo from "../Payment/CardInfoView";
import UpdateCardInfo from "../Payment/CardInfoUpdate";
import Signup from "../User/Signup";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Navbar/> }>
                    <Route path="home" element={<Home />} />
                    <Route path="studios" element={<StudioList />} />
                    <Route path="register" element={<Signup />} />
                    <Route path="studios/:studioID" element={<StudioView />} />
                    <Route path="studios/class/:classID/view" element={<ClassView />} />
                    <Route path="studios/class/" element={<ClassList />} />
                    <Route path="subscription/plans/all" element={<SubscriptionPlansList />} />
                    <Route path="subscription/plans/current" element={<CurrentSubscription />} />
                    <Route path="subscription/plans/create/:subsID" element={<CreateSubscription />} />
                    <Route path="subscription/plans/update/:subsID" element={<UpdateSubscription />} />
                    <Route path="subscription/plans/cancel" element={<CancelSubscription />} />
                    <Route path="subscription/plans/cancelled" element={<CancelledSubscription />} />
                    <Route path="payment/history" element={<PaymentHistory />} />
                    <Route path="payment/cardinfo/view" element={<ViewCardInfo />} />
                    <Route path="payment/cardinfo/update" element={<UpdateCardInfo />} />
                    <Route path="schedule" element={<Schedule/>}/>
                    <Route path="history" element={<History/>}/>
                    <Route path="logout"/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
