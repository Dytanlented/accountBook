import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'

axios.get('/items').then((response)=>{
	console.log(response)
})

// const newItem = {
// 	"title": "请别人按摩",
//     "price": 998,
//     "date": "2020-02-15",
//     "monthCategory": "2020-02",
//     "id": "_qryggm588",
//     "cid": "3",
//     "timestamp": 1534299900000
// }
// axios.post('/items',newItem).then((response)=>{
// 	console.log(response)
// })


ReactDOM.render(<App />, document.getElementById('root'));

