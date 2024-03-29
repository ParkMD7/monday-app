import { TabList, Tab } from "monday-ui-react-core";

const AppTabs = ({ onTabChange, activeIndex }) => {
  return (
    <TabList tabType="stretched" className="tabList">
      <Tab onClick={() => onTabChange(0)} active={activeIndex === 0}>
        Create Order
      </Tab>
      <Tab onClick={() => onTabChange(1)} active={activeIndex === 1}>
        View Fragrances
      </Tab>
      <Tab onClick={() => onTabChange(2)} active={activeIndex === 2}>
        Create Fragrance
      </Tab>
    </TabList>
  );
};

export default AppTabs;
