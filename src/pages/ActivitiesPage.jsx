import Sidebar from "../components/common/Sidebar";
import { Activities } from "../components/activities/Activities";
import Navigation from "../components/common/Navigation";

export const ActivitiesPage = () => {
  return (
    <div className="d-flex flex-column">
      <Navigation />
      <div className="d-flex">
        <Sidebar />
        <Activities />
      </div>
    </div>
  );
};
