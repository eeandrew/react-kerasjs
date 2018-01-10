import React,{
  Component
} from 'react';
import ReactDOM from 'react-dom';
import MainComponent from './test'

const render = Component => {
  ReactDOM.render(<Component/>,document.getElementById('app'))
}
render(MainComponent)