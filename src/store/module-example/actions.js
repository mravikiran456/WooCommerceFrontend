import { api } from 'boot/axios'
import { Notify } from 'quasar'
import { cloneDeep, split, findIndex, uniqBy, uniq, map } from 'lodash'


//put csv list
export const putCsvList = ({commit},payload) => {
    // debugger
    // console.log(payload)
    commit('setList',payload)
}

//put product list
export const putProductList=({commit},payload)=>{
    commit('setProductList',payload)
}


export const getCsvData=async({commit})=>{  
}


export const getProductData = async ({ commit }, payload) => {     
    const products = await api.get('getProducts')
    if(!products){
        Notify.create({
                color: 'Negative',
                position: 'top',
                message: 'Error When Getting the Products',
        })
       return
    }
   commit('storeProductJSON', products)
}

export const storeMapData = async ({ commit, getters, dispatch }, payload) => {     
   let productCols = cloneDeep(getters.getProduct)
   let catalogDetails = cloneDeep(getters.getCatalogDetails) 
   let mappedCols = payload;
   let productData =  {}
   let finalCatalog = {};
   let categories = []; let findMatchObjects;
   let parentID = 0; let previousParent = [];
   let attributes = []; let terms = []; let imagesAttributes = []; let imageCollections;

   //Merging the two arrays
   productCols.forEach((cols,index) => {
       if(!mappedCols[index]){        
          return
       }
       cols.value = mappedCols[index]
       productData[cols.property] = cols.value
   });
   
   catalogDetails.forEach(catalog => {
       //Attributes
       let findAttributeExist = findIndex(attributes, { name: catalog.Color_Name, slug : catalog.Color_Code })
        if(findAttributeExist < 0){
            let options = {};
            options['Color_Name'] = catalog.Color_Name ?? catalog.Color_Name;
            options['Color_Code'] = catalog.Color_Code ?? catalog.Color_Code;
            attributes.push({
                name : options.Color_Name,
                slug: options.Color_Code
            })

            let image = {}
            image['Large_Image_Path'] = catalog.Large_Image_Path ?? catalog.Large_Image_Path;
            image['Thumbnail_Image_Path'] = catalog.Thumbnail_Image_Path ?? catalog.Thumbnail_Image_Path;
            image['Swatch_Image_Path'] = catalog.Swatch_Image_Path ?? catalog.Swatch_Image_Path;
            imagesAttributes.push(image)
        }
        
        //Terms
        let findTermsExist = findIndex(terms, { name: catalog.Size_Name, slug : catalog.Size_Code })
        if(findTermsExist < 0){
            let size = {};
            size['Size_Name'] = catalog.Size_Name ?? catalog.Size_Name;
            size['Size_Code'] = catalog.Size_Code ?? catalog.Size_Code;
            terms.push({
                name : size.Size_Name,
                slug: size.Size_Code
            })
        }
   });


   if(productData['images']){
       debugger
    //Images
    let images = uniq(productData['images'])
    images.forEach(image => {
        // let singleImage = uniq(map(catalogDetails, productData['images']))
        // let singleImage = uniqBy(images)
        // imageCollections.push(singleImage)
    });
    
   }

   //Splitting the categories from the string and storing in different objects
   productData.categories.forEach((element,index) => {
      let catIndex = index + 1; 
      let name = 'Category'+ catIndex +'_Name';
      let unique = 'Category'+ catIndex +'_Unique';
          let data = {
              [name] : catalogDetails[0][element].split('>'),
              [unique] :  catalogDetails[0][unique].split('>')
           }
        data[name].forEach((category, i) => {       
            // let findCat = findIndex(categories, { 'Name' : category });    
            // let findCat = categories.filter(val=> val.Name == category); 
            // let previousCat = categories.length > 0 ? categories[categories.length-1] : 0   
            // if(findCat.length > 0){
            //     debugger
            //     previousParent = findCat
            //     // let previousCat = categories.length > 0 ? categories[categories.length-1] : 0
            // }
            // if(previousCat != 0){
            //     findMatchObjects = categories.filter(val=> val.Name == previousCat.Name)
            //     parentID = findMatchObjects.length > 0 ? findMatchObjects[0].ID : 0;
            // }

            // let parentIndex = findIndex(previousParent, { ParentID : parentID })
           
            // if(parentIndex > 0 && i ==0){
            //    return
            // }
            let findCat = findIndex(categories, { 'Name' : category });
            if(findCat >= 0){
                return
            }
            
            categories.push({
                // ID : categories.length+1,
                // SubCategory : previousCat == 0 ? false : true,
                Slug : data[unique][i],
                Name : category,
                // ParentID : previousParent.length > 0 ? previousParent[0].ID : parentID
            })
            previousParent = [];
        });
   });
   
   finalCatalog.SKUs = [];
   //Grouping the Catalog Details
   catalogDetails.forEach(sku => 
    {
        // debugger
        // finalCatalog.BrandCode = sku.Brand ?? sku.Brand,
        // finalCatalog.BrandName= sku.Brand ?? sku.Brand,
        // finalCatalog.SupplierCode= sku.Supplier_Code ?? sku.Supplier_Code,
        // finalCatalog.ProductCode= sku.Product_Code,
        // finalCatalog.ProductName= sku.Product_Name ?? sku.Product_Name,
        // finalCatalog.ProductDescription= sku.Product_Description ?? sku.Product_Description,
        // finalCatalog.ProductTechSpec= '',
        // finalCatalog.SearchKeywords= ''
        // let variants = {};
        // variants.SupplierSKUCode = sku.Supplier_SKU_ID ?? sku.Supplier_SKU_ID;
        // variants.RetailerSKUCode = sku.Manufacturer_SKU_ID ?? sku.Manufacturer_SKU_ID;
        // variants.MSRP = sku.MSRP ?? sku.MSRP;
        // variants.MAP = sku.MAP ?? sku.MAP;
        // variants.costPrice = sku.Cost_Price ?? sku.Cost_Price;
        // variants.stock = sku.Stock ?? sku.Stock;
        // variants.weight = sku.weight ?? sku.weight;
        // variants.SKUAvailableDate = sku.SKU_Available_Date ?? sku.SKU_Available_Date;
        // variants.SKU_Description = sku.SKU_Description ?? sku.SKU_Description;
        // variants.ThumbnailImagePath = sku.Thumbnail_Image_Path ?? sku.Thumbnail_Image_Path;
        // variants.LargeImagePath = sku.Large_Image_Path ?? sku.Large_Image_Path;
        // finalCatalog.SKUs.push(variants)
    })
    //     finalCatalog.BrandCode:'' ,
    //     finalCatalog.BrandName: sample string 2,
    //     finalCatalog.SupplierCode: sample string 3,
    //     finalCatalog.ProductCode: sample string 4,
    //     finalCatalog.ProductName: sample string 5,
    //     finalCatalog.ProductDescription: sample string 6,
    //     finalCatalog.ProductTechSpec: sample string 7,
    //     finalCatalog.SearchKeywords: sample string 8,
    //     finalCatalog.CreatedDate: 2022-01-18T17:14:11.4478272+00:00,
    //     finalCatalog.ModifiedDate: 2022-01-18T17:14:11.4478272+00:00,
    //     finalCatalog.Categories: [
    //       {            
    //         Name: sample string 2
    //       },
    //       {           
    //         Name: sample string 2,           
    //       }
    //     ],
    //     finalCatalog.SKUs: [
    //       {
    //         SupplierSKUCode: sample string 1,
    //         RetailerSKUCode: sample string 2,
    //         MSRP: 3.1,
    //         MAP: 1.1,
    //         CostPrice: 1.1,
    //         SellingPrice: 1.1,
    //         Weight: 4.1,
    //         Stock: 1,
    //         SKUAvailableDate: 2022-01-18T17:14:11.4478272+00:00,
    //         Description: sample string 5,
    //         ThumbnailImagePath: sample string 6,
    //         LargeImagePath: sample string 7,
    //         IsDefaultSKU: true,
    //         // Options: [
    //         //   {
    //         //     OptionName: sample string 1,
    //         //     OptionTypeId: 2,
    //         //     OptionValueCode: sample string 3,
    //         //     OptionValueName: sample string 4,
    //         //     SwatchImagePath: sample string 5
    //         //   },
    //         //   {
    //         //     OptionName: sample string 1,
    //         //     OptionTypeId: 2,
    //         //     OptionValueCode: sample string 3,
    //         //     OptionValueName: sample string 4,
    //         //     SwatchImagePath: sample string 5
    //         //   }
    //         // ]
    //       },
    //       {
    //         SupplierSKUCode: sample string 1,
    //         RetailerSKUCode: sample string 2,
    //         MSRP: 3.1,
    //         MAP: 1.1,
    //         CostPrice: 1.1,
    //         SellingPrice: 1.1,
    //         Weight: 4.1,
    //         Stock: 1,
    //         SKUAvailableDate: 2022-01-18T17:14:11.4478272+00:00,
    //         Description: sample string 5,
    //         ThumbnailImagePath: sample string 6,
    //         LargeImagePath: sample string 7,
    //         IsDefaultSKU: true,
    //         // Options: [
    //         //   {
    //         //     OptionName: sample string 1,
    //         //     OptionTypeId: 2,
    //         //     OptionValueCode: sample string 3,
    //         //     OptionValueName: sample string 4,
    //         //     SwatchImagePath: sample string 5
    //         //   },
    //         //   {
    //         //     OptionName: sample string 1,
    //         //     OptionTypeId: 2,
    //         //     OptionValueCode: sample string 3,
    //         //     OptionValueName: sample string 4,
    //         //     SwatchImagePath: sample string 5
    //         //   }
    //         // ]
    //       }
    //     ],
    //     finalCatalog.Status: true
    //   }
//    );
   

   commit('storeMapData', productData)

   if(productData.categories && productData.categories.length > 0){
      let categories = productData.categories;
      categories.forEach(category => {
        category = split(category, '>')
      });
   }
   if(productData.tags && productData.tags.length > 0){
      
   }
   if(productData.images && productData.images.length > 0){
      
   }
   if(productData.attributes && productData.attributes.length > 0){
      
   }
   if(productData.default_attributes && productData.default_attributes.length > 0){
      
   }
   if(productData.meta_data && productData.meta_data.length > 0){

   }
   
//     name : state.productData[0][payload['name']],
//     type : "simple",
//     regular_price : state.productData[0][payload['regular_price']],
//     description : state.productData[0][payload['description']],
//     short_description : state.productData[0][payload['short_description']],
//     categories : state.productData[0][payload['categories']],
//     images : state.productData[0][payload['images']]
//    }

   
//    const createProduct = await api.post('createProduct', synchData);
//    debugger;
//    commit('storeMapData', mapData)
//    Notify.create({
//     color: 'positive',
//     position: 'top',
//     message: 'Mapped Successfully',
// })
}
