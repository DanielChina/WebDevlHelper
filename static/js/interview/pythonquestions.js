$(document).ready(function(){
     $("#showAnswers").on("click",response);
     $("#hideAnswers").on("click",response);
     $("#answersDisplay").show();
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
