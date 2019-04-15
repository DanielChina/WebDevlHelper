$( document ).ready(function() {
        let students = [{mark: 70,name: "Dai Bei", age: 120,  degree: 'Bachelor'},
        {mark: 30,name: "Celine Bei", age: 210,  degree: 'Bachelor'},
        {mark: 50,name: "Fi Bei", age: 220,  degree: 'Bachelor'},
        {mark: 40,name: "Ac Bei", age: 214,  degree: 'Bachelor'},
        {mark: 90,name: "Dea Bei", age: 315,degree: 'Bachelor'},
        {mark: 70,name: "Sea Bei", age: 213, degree: 'Bachelor'},
        {mark: 70,name: "Mary Bei", age: 512,  degree: 'Bachelor'},
        {mark: 80,name: "Cury Bei", age: 416,  degree: 'Bachelor'},
        {mark: 90,name: "Lind Bei", age: 414,  degree: 'Bachelor'},
        {mark: 50,name: "Glid Bei", age: 314,  degree: 'Bachelor'},
        {mark: 40,name: "Flid Bei", age: 112, degree: 'Bachelor'}];
        let str='';
        students.forEach(stu=>str+=JSON.stringify(stu)+',<br>');
        $("#excelContentDisplay").html(str);
        // let table=$("#excelContentDisplay").dataTable();
        // students.forEach(stu=>{
        //     let mark=stu.mark;
        //     let name=stu.name;
        //     let age=stu.age;
        //     let degree=stu.degree;
        //     table.row.add([mark,name,age,degree]).draw()});
         $("#btSendEmail").click(sendEmail);
         function sendEmail(){
             let emailAddress=$("#emailAddress").val();
             let data={
                 emailAddress:emailAddress,
                 students:students
             };
             CommonUtilities.makeHttpRequest('/program/sendattachment.html/sendAttachmentContent',JSON.stringify(data),'POST').then(res=>{
                if(res.success)
                    alert("Succeed to send attachment!");
                else
                    alert("Fail to send attachment!");
            });
         }
});