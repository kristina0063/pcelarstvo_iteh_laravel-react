import Sidebar from "../components/common/Sidebar";
import Beehives from "../components/beehives/Beehives";
import Navigation from "../components/common/Navigation";

export const BeehivesPage = () => {
  return (
    <div className="d-flex flex-column">
      <Navigation />
      <div class="d-flex">
        <Sidebar />
        <Beehives/>
      </div>
    </div>
  );
};
