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
      isLoading:false
    }
    const withLoading = (cb) =>{
      return (...args)=>{
        this.setState({
          isLoading:true
        })
        return cb(...args)
      }
    }
    this.actions = {
      getInitialData: withLoading(async ()=>{
        const { currentDate } = this.state
        const getURLWithData = `items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timeStamp&_order=desc`
        const results = await Promise.all([axios.get('/categories'),axios.get(getURLWithData)])
        const [categories,items] = results
        this.setState({
          items:flattenArr(items.data),
          categories:flattenArr(categories.data),
          isLoading:false
        })
        return items
      }),
      getEditData:withLoading(async (id)=>{
        let promiseArr = [axios.get('/categories')]
        if(id){
          const getURLWithID = `/items/${id}`
          promiseArr.push(axios.get(getURLWithID))
        }
        const [categories,editItem] = await Promise.all(promiseArr)
        if(id){
          this.setState({
            categories:flattenArr(categories.data),
            isLoading:false,
            items:{...this.state.items,[id]:editItem.data}
          })
        }else{
          this.setState({
            categories:flattenArr(categories.data),
            isLoading:false
          })
        }
        return {
          categories:flattenArr(categories.data),
          editItem: editItem ? editItem.data : null
        }
      }),
      selectNewMonth: withLoading(async (year,month)=>{
        const getURLWithData = `items?monthCategory=${year}-${month}&_sort=timeStamp&_order=desc`
        const items = await axios.get(getURLWithData)
        this.setState({
          items:flattenArr(items.data),
          currentDate:{ year, month },
          isLoading:false
        })
        return items
      }),
      deleteItem: withLoading(async (item)=>{
        const deleteItem = await axios.delete(`/items/${item.id}`)
        delete this.state.items[item.id]
        this.setState({
          items: this.state.items,
          isLoading:false
        })
        return deleteItem
      }),
      createItem: withLoading(async (data,categoryId) => {
        const newId = ID()
        const parsedDate = parseToYearAndMonth(data.date)
        data.monthCategory = `${parsedDate.year}-${parsedDate.monnth}`
        data.timeStamp = new Date(data.date).getTime()
        const newItem = await axios.post('/items',{ ...data,id:newId,cid:categoryId })
        this.setState({
          items:{...this.state.items, [newId] : newItem.data },
          isLoading:false
        })
        return newItem.data
      }),
      updateItem:withLoading(async (item,updatedCategoryId)=>{
        const updatedData = {
          ...item,
          cid:updatedCategoryId,
          timeStamp: new Date(item.date).getTime()
        }
        const modifiedItem = await axios.put(`/items/${item.id}`,updatedData)
        this.setState({
          items: {...this.state.items,[modifiedItem.id]:modifiedItem.data},
          isLoading:false
        })
        return modifiedItem.data
      })
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
