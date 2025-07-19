import Apiaries from "../components/apiares/Apiaries";
import Navigation from "../components/common/Navigation";
import Sidebar from "../components/common/Sidebar";

export const ApiariesPage = () => {
  return (
    <div className="d-flex flex-column">
      <Navigation />
      <div class="d-flex">
        <Sidebar />
        <Apiaries />
      </div>
    </div>
  );
};
