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
    $("#displayBeforeSorting").html(str);
    students.sort((a,b)=>{
            if(a.mark<b.mark) return -1;
            else if(a.mark>b.mark) return 1;
            else {
                if(a.name<b.name) return -1;
                else return 1;
            }});
        str='';
    students.forEach(stu=>str+=JSON.stringify(stu)+',<br>');
    $("#displayAfterSorting").html(str);
});