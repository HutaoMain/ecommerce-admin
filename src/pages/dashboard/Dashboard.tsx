import GrandTotal from "../../components/boxes/GrandTotal";
import GrandTotalCategory from "../../components/boxes/GrandTotalCategory";
import GrandTotalProducts from "../../components/boxes/GrandTotalProducts";
import GrandTotalUsers from "../../components/boxes/GrandTotalUsers";
import BarChart from "../../components/charts/BarChart";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <section className="dashboard-boxes">
        <GrandTotal />
        <GrandTotalUsers />
        <GrandTotalCategory />
        <GrandTotalProducts />
      </section>
      <section className="dashboard-charts">
        <BarChart />
      </section>
    </div>
  );
};

export default Dashboard;
