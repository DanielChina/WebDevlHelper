$(document).ready(function(){
    getRecord();
    $("#showAnswers").on("click",response);
    $("#hideAnswers").on("click",response);
    $("#questionsDisplay").show();
    $("#answersDisplay").show();
    $("#saveQuestion").click({type:'questions'},saveContentRequest);
    $("#saveAnswer").click({type:'answers'},saveContentRequest);
    function saveContentRequest(event){
        let data=''
        if(event.data.type=="questions") {
            data = $("#inputQuestion").val();
            data='<p>'+data+'</p>';
            $("#questionsDisplay").append(data)
        }
        else {
            data = $("#inputAnswer").val();
            data = '<p>'+data+'</p>';
            $("#answersDisplay").append(data)
        }
        CommonUtilities.makeHttpRequest("/interview/pythonquestions.html/saveContent",JSON.stringify({type:event.data.type,data:data}),'POST').then(
                res=>{if(res.success) alert("Succeeded to save!");
                else alert("Failed to save!");}
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
