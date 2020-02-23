import React from 'react'
import Ionicon from 'react-ionicons'


class CategorySelect extends React.Component {
	selectCategory = (event, category) => {
    this.props.onSelectCategory(category)
    event.preventDefault()
  	}
	render() {
		const { categories,selectedCategory } = this.props
		const selectedCategoryId = selectedCategory && selectedCategory.id
		
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
								onClick ={(event)=>{this.selectCategory(event,category)}}>
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