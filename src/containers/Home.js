import React,{Component} from 'react';
import "../bootstrap.css";
import PriceList from "../components/PriceList";
import ViewTab from "../components/ViewTab";
import TotalPrice from "../components/TotalPrice";
import CreateBtn from "../components/CreateBtn";
import MonthPicker from "../components/MonthPicker";
import {LIST_VIEW, CHART_VIEW, TYPE_INCOME,TYPE_OUTCOME,parseToYearAndMonth,padLeft} from '../utility';
import { Tabs,Tab } from "../components/Tabs"
import Ionicon from 'react-ionicons'

import withContext from '../WithContext'

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
    "date": "2020-01-14",
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

const newItem = {
	"id":4,
	"title":"new item",
	"price":200,
	"date":"2020-02-15",
	"cid":1
}
const tabsText = [LIST_VIEW,CHART_VIEW]

class Home extends Component {
	constructor(props){
		super(props)
		this.state={
			items,
			currentDate : parseToYearAndMonth(),
			tabView: tabsText[0]
		}
	}
	changeView = (index)=>{
		this.setState({
			tabView: tabsText[index],
		})
	}
	changeDate = (year,month)=>{
		this.setState({
			currentDate:{year,month}
		})
	}
	modifyItem = (modifiedItem)=>{
		const modifiedItems = this.state.items.map(item=>{
			if(item.id===modifiedItem.id){
				return 	{...item,title:"new title"}
			}else{
				return item
			}
		})
		this.setState({
			items:modifiedItems
		})
	}
	createItem = ()=>{
		this.setState({
			items:[newItem,...this.state.items]
		})
	}
	deleteItem =(deletedItem)=>{
		const filteredItems = this.state.items.filter(item=>item.id!=deletedItem.id)
		this.setState({
			items:filteredItems
		})
	}

	render() {
		const { data } = this.props

		const {items,currentDate,tabView} = this.state
		const itemsWithCategory = items.map(item=>{
			item.category = categories[item.cid]
			return item
		}).filter(item=>{
			return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
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
				        onChange={this.changeDate}
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
					<Tabs activeIndex={0} onTabChange={this.changeView}>
					 <Tab>
						<Ionicon
							className="rounded-circle"
							fontSize="20px"
							color={'#007bff'}
							icon='ios-paper'
						/>
						List mode
					 </Tab>
					 <Tab>
						<Ionicon
							className="rounded-circle"
							fontSize="20px"
							color={'#007bff'}
							icon='ios-pie'
						/>
						Chart mode
					 </Tab>
					</Tabs>
					<ViewTab 
			      activeTab={tabView}
		        onTabChange={this.changeView}
			    />
			    <CreateBtn onClick={this.createItem}/>
			    {tabView===LIST_VIEW&&
			    	<PriceList 
		        	items={itemsWithCategory}
		        	onModifyItem={this.modifyItem}
		        	onDeleteItem={this.deleteItem}
			    	/>
			    }
			    {tabView===CHART_VIEW&&
			    	<h1>This is chart view</h1>
			    }
				</div>
			</React.Fragment>
		)
	}
}

export default withContext(Home)


