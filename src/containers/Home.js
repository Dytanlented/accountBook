import React,{Component} from 'react';
import "../bootstrap.css";
import PriceList from "../components/PriceList";
import ViewTab from "../components/ViewTab";
import TotalPrice from "../components/TotalPrice";
import CreateBtn from "../components/CreateBtn";
import MonthPicker from "../components/MonthPicker";
import {LIST_VIEW, CHART_VIEW, TYPE_INCOME,TYPE_OUTCOME,parseToYearAndMonth} from '../utility';

const categories = {
	"1":{
		"id": 1,
      "name": "travel",
      "type": "outcome",
      "iconName":"ios-plane",
	},
	"2":{
		"id": 2,
		"name": "financing",
		"type":"income",
		"iconName": "logo-yen",
	}
}

const items =[
  {
    "id":1,
    "title": "travel to Canada",
    "price": 1000,
    "date": "2020-02-14",
    "cid":1
  },
  {
    "id":2,
    "title": "travel to America",
    "price": 800,
    "date": "2020-02-01",
    "cid":1
  },
  {
  	"id":3,
  	"title": "salary",
  	"price": 5000,
  	"date": "2020-02-20",
  	"cid":2
  }

]

class Home extends Component {
	constructor(props){
		super(props)
		this.state={
			items,
			currentDate : parseToYearAndMonth(),
			tabView: LIST_VIEW
		}
	}

	render() {
		const {items,currentDate,tabView} = this.state
		const itemsWithCategory = items.map(item=>{
			item.category = categories[item.cid]
			return item
		})


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
					<div className="row">
						<div className="col">
							<MonthPicker
				        year={currentDate.year}
				        month={currentDate.month}
				        onChange={(year,month)=>{}}
					    />
						</div>
						<div className="">
							<TotalPrice
		        	income={totalIncome}
			        outcome={totalOutcome}
				    />
						</div>
					</div>    
				</header>
				<div className="content-area py-3 px-3">
					<ViewTab 
			      activeTab={tabView}
		        onTabChange={(view)=>{console.log(view)}}
			    />
			    <CreateBtn onClick={()=>{}}/>
			    <PriceList 
		        items={itemsWithCategory}
		        onModifyItem={(item)=>{alert(item.id)}}
		        onDeleteItem={(item)=>{alert(item.id)}}
			    />
				</div>
			</React.Fragment>
		)
	}
}

export default Home


