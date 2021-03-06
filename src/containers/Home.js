import React,{Component} from 'react';
import "../bootstrap.css";
import PriceList from "../components/PriceList";
// import ViewTab from "../components/ViewTab";
import TotalPrice from "../components/TotalPrice";
import CreateBtn from "../components/CreateBtn";
import MonthPicker from "../components/MonthPicker";
import {LIST_VIEW, CHART_VIEW, TYPE_INCOME,TYPE_OUTCOME,parseToYearAndMonth,padLeft} from '../utility';
import { Tabs,Tab } from "../components/Tabs"
import Ionicon from 'react-ionicons'
import { withRouter } from 'react-router-dom'
import withContext from '../WithContext'
import Loader from '../components/Loader'


const tabsText = [LIST_VIEW,CHART_VIEW]

class Home extends Component {
	constructor(props){
		super(props)
		this.state={
			tabView: tabsText[0]
		}
	}
	componentDidMount() {
		this.props.actions.getInitialData()
	}
	changeView = (index)=>{
		this.setState({
			tabView: tabsText[index],
		})
	}
	changeDate = (year,month)=>{
		this.props.actions.selectNewMonth(year,month)
	}
	modifyItem = (item)=>{
		this.props.history.push(`/edit/${item.id}`)
	}
	createItem = ()=>{
		this.props.history.push('./create')
	}
	deleteItem =(item)=>{
		this.props.actions.deleteItem(item)
		console.log("homejs"+item.id)
	}

	render() {
		const { data } = this.props
		const { items, categories, currentDate, isLoading } = data
		const { tabView } = this.state
		const itemsWithCategory = Object.keys(items).map(id=>{
			items[id].category = categories[items[id].cid]
			return items[id]
		})
		let totalIncome = 0;
		let totalOutcome = 0;
		itemsWithCategory.forEach(item=>{
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
					{isLoading && 
						<Loader />
					}
					{!isLoading &&
						<React.Fragment>
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
						</React.Fragment>
					}
					
				</div>
			</React.Fragment>
		)
	}
}

export default withRouter(withContext(Home))


