
export const storeProductJSON = (state, data) => {
    state.productJSON = data.data.response
}


export const storeMapData = (state, data) => {
    state.mapData = data     
  }
// set csv list
export const setList = (state,payload) => {
    
    state.csvCols=payload
    
}
 
//set product list

export const setProductList=(state,payload)=>{
    state.productData=payload
}