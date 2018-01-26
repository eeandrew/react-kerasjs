import React,{
  Component
} from 'react';
import ReactDOM from 'react-dom';
import MainComponent from './test'
import IdentifySanta from './identify_santa/index'
import {testAdd} from './test/webgl/dynamic/merge/add'

const render = Component => {
  ReactDOM.render(<Component/>,document.getElementById('app'))
}
render(IdentifySanta)