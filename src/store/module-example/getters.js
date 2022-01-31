import { groupBy } from 'lodash'

export const getProduct = state => state.productJSON;
//get csv list
export const getCSVCols = state => state.csvCols
//get product list 
export const getCatalogDetails = state => {
    // let val = groupBy(state.productData, val=> val.Product_Code)
    return state.productData
}