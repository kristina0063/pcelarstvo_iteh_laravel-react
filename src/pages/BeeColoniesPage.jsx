import Sidebar from "../components/common/Sidebar";
import { Activities } from "../components/activities/Activities";
import BeeColonies from "../components/beeColonies/BeeColonies";
import Navigation from "../components/common/Navigation";

export const BeeColoniesPage = () => {
  return (
    <div className="d-flex flex-column">
      <Navigation />
      <div class="d-flex">
        <Sidebar />
        <BeeColonies />
      </div>
    </div>
  );
};
