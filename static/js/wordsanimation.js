$( document ).ready(function() {
    let logo=$("#logo").find("path");
    for(let i =0; i<15;i++){
        console.log(logo[i].getTotalLength().toString()+',');
    }
});