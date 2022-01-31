<template>

<!-- csvtojson -->
<!-- <div class="container" >
        <form id='form'>
                <div class="input-group">
                <label for='file'>Select files</label>
                <input id='file' type="file" ref="inputFile" accept="text/csv" @change="previewFiles">
                </div>
            <button class="submit-btn" @click.prevent="csvTojson()"> Upload</button>
        </form>
          <p class="upload-button" @click="$router.replace('/')">sync page</p>
    </div> -->
  
<div class="q-pa-md">
    <div class="container">
    <q-uploader
      :factory="csvTojson"
      multiple
      style="width: 500px"
    />
     <p class="text" @click="$router.replace('/')">sync page</p>
  </div>
</div>
</template>

<script>
import {useStore} from 'vuex';
import papa from 'papaparse';
import {ref} from 'vue';
export default{
    setup(){
        const $store=useStore();
        const csvData = ref([])
        const csvList=ref([]);
        const datakeys=ref();
        const inputFile=ref(null);
        const previewFiles=(event)=>{
            console.log(event.target.files);
         }
        const csvTojson=(files)=>{
            // debugger
            let csvFile=files[0]
            console.log(csvFile)
        if(csvFile===undefined){
            alert("Please select the file")
            // this.csvData=[];
            // return
        }
        else{
        papa.parse(csvFile,{
            header:true,
            dynamicTyping:true,
            skipEmptyLines:true,
            preview:100,
            complete(result){
                inputFile.csvData=result.data
                // console.log(inputFile.csvData)

                let list=[]
                for(let i of inputFile.csvData){
                    list.push(i)
                }
                console.log(list)
                
                // let first=inputFile.csvData[0]
                // console.log(first)
                // debugger
                const datakeys=Object.keys(inputFile.csvData[inputFile.csvData.length-1])
                console.log(datakeys)

                $store.dispatch('example/putCsvList',datakeys)

                $store.dispatch('example/putProductList',list)
            }
        }); 
        }
        }
    return {
        previewFiles,
        inputFile,
        csvTojson,
        datakeys,
        csvData,
        csvList
    }
    }
   
}
</script>


<style >
* {
    box-sizing: border-box;
}
.container {
    max-width: 500px;
    margin: 60px auto;
}
.container h1 {
    text-align: center;
    color: white;
}
form {
    background-color: white;
    padding: 30px;
}
form .input-group {
    margin-bottom: 15px;
}
form label {
    display: block;
    margin-bottom: 10px;
}
form input {
    padding: 12px 20px;
    width: 100%;
    border: 1px solid #ccc;
}
.submit-btn {
    width: 100%;
    border: none;
    background: rgb(37, 83, 3);
    font-size: 18px;
    color: white;
    border-radius: 3px;
    padding: 20px;
    text-align: center;
}
.text{
    margin-top: 20px;
    cursor: pointer;
    text-decoration:underline;
}
</style>
