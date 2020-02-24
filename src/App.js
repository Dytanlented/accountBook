import React ,{ Component } from 'react';
import "./bootstrap.css";
import './App.css';
import { BrowserRouter as Router , Route, Link} from "react-router-dom"

import Home from "./containers/Home";
import Create from "./containers/Create"
import PriceForm from "./components/PriceForm";

import { flattenArr, ID, parseToYearAndMonth } from './utility'
import axios from 'axios'
export const AppContext = React.createContext()

class App extends Component{
  constructor(props){
    super(props)
    this.state ={
      items:{},
      categories: {},
      currentDate:parseToYearAndMonth(),
    }
    this.actions = {
      getInitialData:()=>{
        const { currentDate } = this.state
        const getURLWithData = `items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timeStamp&_order=desc`
        const promiseArr = [axios.get('/categories'),axios.get(getURLWithData)]
        Promise.all(promiseArr).then(arr=>{
          const [categories,items] = arr
          this.setState({
            items:flattenArr(items.data),
            categories:flattenArr(categories.data)
          })
        })
      },
      selectNewMonth: (year,month)=>{
        const getURLWithData = `items?monthCategory=${year}-${month}&_sort=timeStamp&_order=desc`
        axios.get(getURLWithData).then(items=>{
          this.setState({
            items:flattenArr(items.data),
            currentDate:{ year, month }
          })
        })
      },
      deleteItem:(item)=>{
        axios.delete(`/items/${item.id}`).then(()=>{
          delete this.state.items[item.id]
          this.setState({
            items: this.state.items
          })
        })
      },
      createItem: (data,categoryId) => {
        const newId = ID()
        const parsedDate = parseToYearAndMonth(data.date)
        data.monthCategory = `${parsedDate.year}-${parsedDate.monnth}`
        data.timeStamp = new Date(data.date).getTime()
        const newItem = { ...data,id:newId,cid:categoryId }
        this.setState({
          items:{...this.state.items, [newId] : newItem }
        })
      },
      updateItem:(item,updatedCategoryId)=>{
        const modifiedItem = {
          ...item,
          cid:updatedCategoryId,
          timeStamp: new Date(item.date).getTime()
        }
        this.setState({
          items: {...this.state.items,[modifiedItem.id]:modifiedItem}
        })
      }
    }
  }
  render(){
    return (
      <AppContext.Provider value={{
        state:this.state,
        actions:this.actions,
      }}>
        <Router>
          <ul>
            <Link to="/">Home</Link>
            <Link to="/create">Create</Link>
            <Link to="/edit/998">Edit</Link>
            <Link to="/test">Price Form</Link>
          </ul>
          <div className="App">
            <Route path="/" exact component={Home} />
            <Route path="/create" component={Create} />
            <Route path="/edit/:id" component={Create} />
            <Route path="/test" component={PriceForm} />
          </div>
        </Router>
      </AppContext.Provider>
    );
  }
  
}

export default App;
