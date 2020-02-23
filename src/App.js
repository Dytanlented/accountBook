import React ,{ Component } from 'react';
import "./bootstrap.css";
import './App.css';
import { BrowserRouter as Router , Route, Link} from "react-router-dom"

import Home from "./containers/Home";
import Create from "./containers/Create"
import PriceForm from "./components/PriceForm";
import { testItems, testCategories } from './testData'
import { flattenArr, ID, parseToYearAndMonth } from './utility'

export const AppContext = React.createContext()

class App extends Component{
  constructor(props){
    super(props)
    this.state ={
      items:flattenArr(testItems),
      categories: flattenArr(testCategories)
    }
    this.actions = {
      deleteItem:(item)=>{
        delete this.state.items[item.id]
        this.setState({
          items: this.state.items
        })
        console.log(this.state.items)
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
