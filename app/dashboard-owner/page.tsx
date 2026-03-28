import Header from "../components/header";
import CSOptionsOwner from "../components/csOptionsOwner";
import OwnerStatus from "../components/owner-status";

export default async function DashboardOwner() {
  return (
    <div className="bg-white">
      <div className="sticky top-0 z-10">
        <Header sideBarColor="bg-blue-400" colorBg="bg-blue-200" cartIcon="/images/icons/cart-blue.svg" sideBarOpenIcon="/images/icons/sidebar-open-blue.svg"/>
      </div>
      <OwnerStatus/>
      <div className="lg:mt-24 mt-8">
        <CSOptionsOwner/>
      </div>
    </div>
  )
};