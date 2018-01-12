import ndarray from 'ndarray'
import ops from 'ndarray-ops'

export default class ImageDataUtils {
  static preprocess(imageData) {
    const {
      width,
      height,
      data
    } = imageData;
    const dataTensor = ndarray(new Float32Array(data),[width,height,4])
    const dataProcessedTensor = ndarray(new Float32Array(width*height*3),[width,height,3])
    ops.divseq(dataTensor,255)
    ops.assign(dataProcessedTensor.pick(null,null,0),dataTensor.pick(null,null,0))
    ops.assign(dataProcessedTensor.pick(null,null,1),dataTensor.pick(null,null,1))
    ops.assign(dataProcessedTensor.pick(null,null,2),dataTensor.pick(null,null,2))
    const preprocessedData = dataProcessedTensor.data
    return preprocessedData
  }   
}