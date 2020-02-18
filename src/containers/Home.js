import React,{Component} from 'react';
import PriceList from "../components/PriceList";
import ViewTab from "../components/ViewTab";
import TotalPrice from "../components/TotalPrice";
import MonthPicker from "../components/MonthPicker";
import {LIST_VIEW, CHART_VIEW, TYPE_INCOME,TYPE_OUTCOME} from '../utility';

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

class Home extends Component {
	render() {
		let totalIncome = 0;
		let totalOutcome = 0;
		items.forEach(item=>{
			if(item.category.type===TYPE_OUTCOME){
				totalOutcome += item.price
			}else{
				totalIncome += item.price
			}
		})
		return(
			<React.Fragment>
				<header className="App-header" >
					
				</header>
			</React.Fragment>
		)
	}
}

export default Home


