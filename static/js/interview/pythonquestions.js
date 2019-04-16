$(document).ready(function(){
    getRecord();
    $("#showAnswers").on("click",response);
    $("#hideAnswers").on("click",response);
    $("#questionsDisplay").show();
    $("#answersDisplay").show();
    $("#saveQuestion").click({type:'questions'},saveContentRequest);
    $("#saveAnswer").click({type:'answers'},saveContentRequest);
    $("#deleteLastQuestion").click({type:'questions'},deleteRequest);
    $("#deleteLastAnswer").click({type:'answers'},deleteRequest);
    function deleteRequest(event){
        let data='',id;
        if(event.data.type=="questions") {
            id= "#questionsDisplay";
        }
        else {
            id="#answersDisplay";
        }
        let elements=$(id).find('p');
        if(elements.length>0){
            data='<p>'+elements[elements.length-1].outerText+'</p>';
            elements[elements.length-1].remove();
        }
        CommonUtilities.makeHttpRequest("/interview/pythonquestions.html/deleteContent",
            JSON.stringify({type:event.data.type,data:data}),'POST').then(res=>alert(res.success));
    }
    function saveContentRequest(event){
        let data='';
        if(event.data.type=="questions") {
            data = $("#inputQuestion").val();
            if(data.length==0)
                return;
            data='<p>'+data+'</p>';
            $("#questionsDisplay").append(data)
        }
        else {
            data = $("#inputAnswer").val();
            if(data.length==0)
                return;
            data = '<p>'+data+'</p>';
            $("#answersDisplay").append(data)
        }
        CommonUtilities.makeHttpRequest("/interview/pythonquestions.html/saveContent",
            JSON.stringify({type:event.data.type,data:data}),'POST').then(
                res=>{
                    if(res.success){
                        alert("Succeeded to save!");
                        $("#inputQuestion").val('')}
                    else
                        alert("Failed to save!");}
        );
    }
    function getRecord() {
        CommonUtilities.makeHttpRequest("/interview/pythonquestions.html/getContent",null,'POST').then(
            res=>{
                $("#questionsDisplay").html(res.data.questions);
                $("#answersDisplay").html(res.data.answers);
            }
        );
     }
    function response(){
        if($(this).attr("id")=="showAnswers" && $("#hideAnswers").hasClass("btn-primary")) {
            $("#hideAnswers").removeClass("btn-primary");
            $("#answersDisplay").show();
        }
        if($(this).attr("id")=="hideAnswers" && $("#showAnswers").hasClass("btn-primary")) {
            $("#showAnswers").removeClass("btn-primary");
            $("#answersDisplay").hide();
        }
        if(!($(this).hasClass("btn-primary")))
            $(this).addClass("btn-primary");
    }
})
