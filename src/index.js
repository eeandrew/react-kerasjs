import React,{
  Component
} from 'react';
import ReactDOM from 'react-dom';
import MainComponent from './test'
import IdentifySanta from './identify_santa/index'

const render = Component => {
  ReactDOM.render(<Component/>,document.getElementById('app'))
}
render(IdentifySanta)