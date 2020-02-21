import React from 'react'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'

class CategorySelect extends React.Component {
	constructor(props){
		super(props)
		this.state ={
			selectedCategoryId: props.selectedCategory && props.selectedCategory.id

		} 
	}
	selectedCategory = (event,category)=>{
		this.setState({
			selectedCategoryId:category.id
		})
		this.props.onSelectCategory(category)
		event.preventDefault()
	}
	render() {
		const { categories } = this.props
		const { selectedCategoryId } = this.state

		return (
			<div className="category-select-component">
				<div className="row">
					{
						categories.map((category,index)=>{
							const iconColor = (selectedCategoryId === category.id) ? '#fff':'#555'
							const backColor = (selectedCategoryId === category.id) ? '#347eff':'#efefef'
							const activeClassName = (selectedCategoryId === category.id) ? 'category-item col-3 active' : 'category-item col-3'
							return (
								<div className={activeClassName} key={index} style={{textAlign:"center"}}
								onClick ={(event)=>{this.selectedCategory(event,category)}}>
									<Ionicon
										className="rounded-circle"
										style={{backgroundColor:backColor,padding:'5px'}}
										fontSize="50px"
										color={iconColor}
										icon={category.iconName}
									/>
									<p>{category.name}</p>
								</div>
							)
						})
					}
				</div>
			</div>
		)
	}
}

export default CategorySelect