import React,{
  Component
} from 'react'
import './index.css'
import PropTypes from 'prop-types'
import ImageDataUtils from '../../utils/ImageDataUtils'
import KerasJS from 'keras-js'

export default class ImgResizer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      probility : 0
    }
  }



  componentDidMount() {
    const ctx = this.refs.canvas.getContext('2d');
    const imgdom = document.createElement('img');
    imgdom.src = 'http://localhost:3000/9.jpeg'
    imgdom.onload = ()=>{
      ctx.drawImage(imgdom,0,0,128,128)
      const imagedata = ctx.getImageData(0,0,128,128)
      const processeddata = ImageDataUtils.preprocess(imagedata)
      console.log(processeddata)
      this.initKerasModel(processeddata)
    }
  }

  async initKerasModel(imagedata) {
    const model = new KerasJS.Model({
      filepath: 'http://localhost:3000/keras_santa.bin',
      gpu: false
    })
    model.events.on('loadingProgress', (progress) => {
      console.log(progress)
    })
    model.events.on('predictProgress',(progress) => {
      console.log('predict ' + progress)
    })
    try {
      await model.ready()
      const inputname = model.inputLayerNames[0]
      const outputName = model.outputLayerNames[0]
      const inputdata = {[inputname]: imagedata}
      const prediction = await model.predict(inputdata)
      console.log(prediction.output[0])
      this.setState({
        probility: prediction.output[0]
      })

    }catch(err){
      console.log(err)
    }
  }


  render() {
    const {
      probility
    } = this.state;
    return (
      <div>
      <div>{probility}</div>
      <canvas className="img-resizer" ref="canvas" width={128} height={128}>
        
      </canvas>
      </div>
    );
  }
}