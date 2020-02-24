import React,{Component} from 'react'
import { isValidDate } from '../utility'



class PriceForm extends Component {
	static defaultProps = {
    item: {}
  }

	state = {
		validatePass:true,
		errorMessage:''
	}

	submitForm = (event)=>{
		const {item,onFormSubmit} = this.props
		const editMode = !!item.id
		const price = this.priceInput.value.trim()*1 
		const date = this.dateInput.value.trim()
		const title = this.titleInput.value.trim()
		if(price&&date&&title){
			if(price<0){
				this.setState({
					validatePass:false,
					errorMessage:"Price must be greater 0"
				})
			}else if(!isValidDate(date)){
				this.setState({
					validatePass:false,
					errorMessage:"Please enter correct date"
				})
			}else{
				this.setState({
					validatePass:true,
					errorMessage:''
				})
				if (editMode) {
			        onFormSubmit({ ...item, title, price, date }, editMode)
			    } else {
			        onFormSubmit({ title, price, date }, editMode)
			    }
			}
		}else{
			this.setState({
				validatePass:false,
				errorMessage:"Please fill all required information"
			})
		}
		event.preventDefault()
	}
	render(){
		const { title, price, date } = this.props.item
		return(
			<form onSubmit={(event)=>{this.submitForm(event)}} noValidate>
				<div className="form-group">
					<label htmlFor="title">Title *</label>
					<input
						type="text" className="form-control"
						id="title" placeholder="Please enter title"
						ref={(input)=>{this.titleInput = input}}
						defaultValue={title}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="price">Price *</label>
					<input
						type="number" className="form-control"
						id="price" placeholder="Please enter price"
						ref={(input)=>{this.priceInput = input}}
						defaultValue={price}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="date">Date *</label>
					<input 
						type="date" className="form-control"
						id="date"
						ref={(input)=>{this.dateInput = input}}
						defaultValue={date}
					/>
				</div>
				<button type="submit" className="btn btn-primary mr-3">Submit</button>
				<button className="btn btn-secondary" onClick={this.props.onFormCancel}>Cancel</button>
				{ !this.state.validatePass &&
					<div className="alert alert-danger mt-5" role="alert">
						{this.state.errorMessage}
					</div>

				}
			</form>
		)
	}

}


export default PriceForm