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
      prediction : 0.0,
      imgs: ['0','9','123','150'],
      progress: 0,
      loadingtitle: ''
    }
  }



  componentDidMount() {
    this.initKerasModel()
  }

  _updateImageSrc(imgid) {
    const ctx = this.refs.canvas.getContext('2d');
    const imgdom = document.createElement('img');
    imgdom.src = `http://localhost:3000/${imgid}.jpeg`
    this.setState({
      prediction:0
    })
    imgdom.onload = ()=>{
      ctx.drawImage(imgdom,0,0,128,128)
      const imagedata = ctx.getImageData(0,0,128,128)
      const processeddata = ImageDataUtils.preprocess(imagedata)
      setTimeout(()=>{
        this.doPrediction(processeddata)
      },100);
    }
  }

  async doPrediction(imagedata) {
    if(!this.model) return;
    const inputname = this.model.inputLayerNames[0]
    const outputName = this.model.outputLayerNames[0]
    const inputdata = {[inputname]: imagedata}
    const prediction = await this.model.predict(inputdata)
    this.setState({
      prediction: prediction.output[0]
    })
  }

  async initKerasModel(imagedata) {
    const model = new KerasJS.Model({
      filepath: 'http://localhost:3000/keras_santa.bin',
      gpu: false
    })
    model.events.on('loadingProgress', (progress) => {
      this.setState({
        loadingtitle: '模型加载',
        progress: parseInt(progress)
      })
      
    })
    model.events.on('predictProgress',(progress) => {
      console.log('predict ' + progress)
      this.setState({
        loadingtitle:'模型预测',
        progress: parseInt(progress)
      })
    })
    this.model = model
    try{
      await model.ready()
      this._updateImageSrc('0')
    }catch(err) {
      console.error(err)
    }
  }



  render() {
    const {
      prediction,
      imgs,
      progress,
      loadingtitle
    } = this.state;
    return (
      <div className="main-content centered">
        <select onChange={event => this._updateImageSrc(event.target.value)}>
            {imgs.map(img => {
              return (<option key={img} value={img}>{img}</option>)
            })}
        </select>
        <div className="canvas-section">
          <canvas className="img-resizer" ref="canvas" width={128} height={128}>
          </canvas>
          {progress == 100 ? null : <Loading label={loadingtitle} progress={progress}/>}
        </div> 
        <div>Prediction: {prediction == 0 ? '计算中..' : prediction.toFixed(4)}</div>
      </div>
    );
  }
}

const Loading = (props) => {
  return (
    <div className="progress-loading">{props.label || ''}{props.progress || 0}%</div>
  )
}