const input=document.querySelector('input[type="file"]');
input.addEventListener('change', function(e){
    console.log(input.files)
    const reader=new FileReader()
    reader.onload=function(){
        const schema=reader.result;
        console.log(schema);
        return schema;
    }
    reader.readAsText(input.files[0])
},false)

