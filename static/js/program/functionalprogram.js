$( document ).ready(function() {
    /***
     first way to deal with async function
     **/

    var httpRequest1=function(){
        let value=$("#inputId1").val();
        var display1=function(data){
            $("#pIdDisplay1").html(data);
        };
        Requests.make_request('/program/functionalprogram.html/request','POST',value,true).then(data=>display1(data.data));
    };
    $("#btIdRequest1").click(httpRequest1);


    /**
     *second way to deal with async function
     ***/
    function httpRequest2(){
        let value=$("#inputId2").val();
        return Promise.resolve(
            Requests.make_request('/program/functionalprogram.html/request','POST',value,true));
    }
    async function display2(event){
        let result=await event.data.httpRequest();
        $("#pIdDisplay2").html(result.data);
    }
    $("#btIdRequest2").click({httpRequest:httpRequest2},display2);
});
