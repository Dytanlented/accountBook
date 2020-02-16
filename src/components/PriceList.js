import React from 'react';


const PriceList = ({items,onModifyItem,onDeleteItem})=>{
	return (
		<ul className="list-group list-group-flush">
			{
				items.map((item) => (
					<li className="list-group-item d-flex
						justify-content-between align-items-center"
						key={item.id}
					>
						<span className="col-1 badge badge-primary">
							{item.category.name}
						</span>
						<span className="col-4">
							{item.title}
						</span>
						<span className="col-1">
							{(item.category.type==="outcome")? '-':'+'}{item.price}
						</span>
						<span className="col-3">{item.category.date}</span>
						<button className="col-1 btn btn-primary" 
							onClick={()=>{onModifyItem(item)}}
						>
							Edit
						</button>
						<button className="col-1 btn btn-danger" 
						onClick={()=>{onDeleteItem(item)}}
						>
							Delete
						</button>
					</li>
				))
			}
		</ul>
	)
}
export default PriceList;