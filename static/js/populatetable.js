$( document ).ready(function() {
    let rowList = [{type: "flow", id: 1}, {type: "level", id: 2},{type: "rain", id: 3}];
    populateTable();
    function populateTable() {
        let table=$('#table').DataTable();
        table.clear();
        rowList.forEach(row=>table.row.add([row.type,row.id]).draw());
    }
    // function populateTable(){
    //     let columns = [{type: "flow", id: 1}, {type: "level", id: 2},{type: "rain", id: 3}];
    //     let head = '<thead> <tr> <th>Type</th> <th>Id</th> </tr> </thead>';
    //     $("#displayArea").html('');
    //     $("#displayArea").append(head);
    //     let body = '<tbody>';
    //     columns.forEach(column => {
    //         type = column.type;
    //         id = column.id;
    //         body += '<tr><td>' + type + '</td>';
    //         body += '<td>' + id.toString() + '</td></tr>';
    //     });
    //     body += '</tbody>';
    //     $("#displayArea").append(body)
    // };
});