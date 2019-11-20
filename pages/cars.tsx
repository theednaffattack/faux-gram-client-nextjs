import CarsOverview from "../src/modules/cars/Overview";
import { getLayout } from "../src/modules/site-layout/layout";

const CarsPage = () => <CarsOverview />;

CarsPage.getLayout = getLayout;
CarsPage.title = "Car Stuff";

export default CarsPage;
