import React,{
  Component
} from 'react';
import ReactDOM from 'react-dom';
import MainComponent from './test'
import IdentifySanta from './identify_santa/index'
import KerasAdd from './math/keras_add'

KerasAdd.testAdd()

const render = Component => {
  ReactDOM.render(<Component/>,document.getElementById('app'))
}
render(IdentifySanta)