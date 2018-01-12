import ImgResizer from '../components/ImgResizer/index'
import React,{
  Component
} from 'react'


export default class IdentifySanta extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <ImgResizer/>
      </div>
    )
  }
}