import KerasJS from 'keras-js'
import addJSON from '../test/data/add'

export default class KerasAdd {
 static testAdd() {
    const layer = new KerasJS.layers.Dense({
      units:2,
      gpu: true,
      use_bias: true
    })
    layer.setWeights(addJSON.weights.map((w)=>{
      return new KerasJS.Tensor(w.data,w.shape)
    }))
    const input = new KerasJS.Tensor(addJSON.input.data,addJSON.input.shape)
    console.log(input)
    const outputTensor = layer.call(input)
    console.log(outputTensor.tensor.data)
    console.log(outputTensor.tensor.shape)
 }
}