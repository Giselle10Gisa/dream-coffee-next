import CsDeliveryOptions from "../components/csDeliveryOptions";
import CsPosts from "../components/csPosts";
import HeaderProfile from "../components/header-profile";

export default function CSProfile () {
    return (
        <div className="bg-white h-screen w-screen">
            <HeaderProfile/>
            <CsPosts/>
            <CsDeliveryOptions offset={3} showArrows={true} width={"100%"} height={"400px"} margin={"0 auto"}/>
        </div>
    );
};