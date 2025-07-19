import Navigation from "../components/common/Navigation";
import Sidebar from "../components/common/Sidebar";
import Notifications from "../components/notifications/Notifications";

export const NotificationsPage = () => {
  return (
    <div className="d-flex flex-column">
      <Navigation />
      <div class="d-flex">
        <Sidebar />
        <Notifications />
      </div>
    </div>
  );
};
