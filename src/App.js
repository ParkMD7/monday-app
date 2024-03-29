import React, { useState, useEffect } from "react";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";

import OrderForm from "./components/OrderForm";
import FragranceForm from "./components/FragranceForm";
import Loading from "./components/Loading";
import AppTabs from "./components/AppTabs";

import { fetchFragrences, deleteFragrance, updateFragrance } from "./api";
import "./App.css";
import FragranceList from "./components/FragranceList";

// https://7b6920520e83.apps-tunnel.monday.com

const App = () => {
  const [mondaySDK, setMondaySDK] = useState(undefined);
  const [tabIndex, setTabIndex] = useState(0);
  const [fragrances, setFragrances] = useState([]);

  useEffect(() => {
    initMondaySDK();
    // if I end up adding a listener here make sure to return a fn to remove it here
  }, []);

  useEffect(() => {
    fetchAllFragrances();
  }, []);

  // Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
  const initMondaySDK = () => {
    const monday = mondaySdk();
    monday.setApiVersion("2023-10");
    monday.setToken(process.env.REACT_APP_API_KEY);
    setMondaySDK(monday);
  };

  const fetchAllFragrances = async () => {
    try {
      const fragrances = await fetchFragrences();
      setFragrances(fragrances);
    } catch (e) {
      console.log("e", e);
    }
  };

  const handleOnFragranceCreate = (fragrance) => {
    setFragrances([...fragrances, fragrance]);
    setTabIndex(1);
  };

  const handleOnFragranceDelete = async (id) => {
    try {
      await deleteFragrance(id);
      const updatedFragrances = fragrances.filter((fragrance) => {
        return fragrance.id !== id;
      });

      setFragrances(updatedFragrances);
    } catch (e) {
      console.log("e", e);
    }
  };

  const handleOnFragranceUpdate = async (fragrance, name) => {
    try {
      const updatedFragrance = await updateFragrance(fragrance, name);
      const updatedFragrances = fragrances.map((s) => {
        if (s.id === fragrance.id) {
          return updatedFragrance;
        } else {
          return s;
        }
      });

      setFragrances(updatedFragrances);
    } catch (e) {
      console.log("e", e);
    }
  };

  const renderTabContent = () => {
    switch (tabIndex) {
      case 0:
        return <OrderForm monday={mondaySDK} fragranceOptions={fragrances} />;
      case 1:
        return (
          <FragranceList
            fragrances={fragrances}
            onUpdateFragrance={handleOnFragranceUpdate}
            onDeleteFragrance={handleOnFragranceDelete}
          />
        );
      case 2:
        return <FragranceForm onSubmit={handleOnFragranceCreate} />;
      default:
        return <Loading message="Please contact your development team" />;
    }
  };

  if (!mondaySDK) {
    return <Loading message="Initializing..." />;
  }

  return (
    <div className="App">
      <div className="appContentWrapper">
        <AppTabs activeIndex={tabIndex} onTabChange={setTabIndex} />
        {renderTabContent()}
      </div>
    </div>
  );
};

export default App;
