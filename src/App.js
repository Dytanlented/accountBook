import React from 'react';
import "./bootstrap.css";
import './App.css';
import PriceList from "./components/PriceList";
import ViewTab from "./components/ViewTab";
import TotalPrice from "./components/TotalPrice";
import MonthPicker from "./components/MonthPicker"
import Home from "./containers/Home";


import {LIST_VIEW, CHART_VIEW} from './utility'

const items =[
  {
    "id":1,
    "title": "travel to Canada",
    "price": 2000,
    "date": "2020-02-14",
    "category":{
      "id": 1,
      "name": "travel",
      "type": "outcome",
      "iconName":"ios-plane"
    }
  },
  {
    "id":2,
    "title": "travel to America",
    "price": 2000,
    "date": "2020-02-01",
    "category":{
      "id": 2,
      "name": "travel",
      "type": "outcome",
      "iconName":"ios-plane"
    }
  }

]


function App() {
  return (
    <div className="App">
      <ViewTab 
        activeTab={LIST_VIEW}
        onTabChange={(view)=>{console.log(view)}}
      />
      <TotalPrice
        income={1000}
        outcome={2000}
      />
      <PriceList 
        items={items}
        onModifyItem={(item)=>{alert(item.id)}}
        onDeleteItem={(item)=>{alert(item.id)}}
      />
      <MonthPicker
        year={2020}
        month={2}
        onChange={(year,month)=>{}}
      />
    </div>
  );
}

export default App;
