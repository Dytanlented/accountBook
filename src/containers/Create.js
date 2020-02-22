import React from 'react'
import CategorySelect from "../components/CategorySelect"
import { Tabs, Tab } from "../components/Tabs"
import PriceForm from "../components/PriceForm"
import { TYPE_INCOME, TYPE_OUTCOME } from "../utility"
import {testCategories} from '../testData'
import { AppContext } from '../App'

class Create extends React.Component {
	constructor(props){
		super(props)
	}
	render() {
		const filterCategories = testCategories.filter(category=>category.type===TYPE_OUTCOME)
		return (
			<AppContext.Consumer >
				{ ({state}) =>{
					return (

						<div className="create-page py-5 px-5 rounded mt-3" style={{background:"#fff"}}>
							<Tabs activeIndex={0} onTabChange={()=>{}}>
								<Tab>
									outcome
								</Tab>
								<Tab>
									income
								</Tab>
							</Tabs>
							<CategorySelect categories={filterCategories} onSelectCategory={()=>{}}/>	
							<PriceForm 
								onFormSubmit={()=>{}}
								onFormCancel={()=>{}}
							/>
						</div>
					)	
				}}
			</AppContext.Consumer>
		)
	}
}

export default Create