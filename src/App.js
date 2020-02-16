import React from 'react';
import "./bootstrap.css";
import './App.css';
import PriceList from "./components/PriceList";
const items =[
  {
    "id":1,
    "title": "travel to Canada",
    "price": 2000,
    "date": "2020-02-14",
    "category":{
      "id": 1,
      "name": "travel",
      "type": "outcome"
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
      "type": "outcome"
    }
  }

]


function App() {
  return (
    <div className="App">
     <div>Hello world</div>
     <PriceList 
      items={items}
      onModifyItem={(item)=>{alert(item.id)}}
      onDeleteItem={(item)=>{alert(item.id)}}
     />
    </div>
  );
}

export default App;
