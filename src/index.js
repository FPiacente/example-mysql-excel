const mysql = require('mysql2');
const excel = require('exceljs');

// Create a connection to the database
const con = mysql.createConnection({
    host: 'localhost',
    user: 'isi',
    password: 'BelimoISI',
    database: 'isi'
});

// Open the MySQL connection
con.connect((err) => {
    if (err) throw err;

    // -> Query data from MySQL
    con.query("SELECT * FROM isilo2", function (err, customers, fields) {

        const jsonCustomers = JSON.parse(JSON.stringify(customers));
        console.log(jsonCustomers);
        /**
         [ { id: 1, address: 'Jack Smith', age: 23, name: 'Massachusetts' },
         { id: 2, address: 'Adam Johnson', age: 27, name: 'New York' },
         { id: 3, address: 'Katherin Carter', age: 26, name: 'Washington DC' },
         { id: 4, address: 'Jack London', age: 33, name: 'Nevada' },
         { id: 5, address: 'Jason Bourne', age: 36, name: 'California' } ]
         */

        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('Customers'); //creating worksheet

        //  WorkSheet Header
        worksheet.columns = [
            { header: 'Id:', key: 'id', width: 10 },
            { header: 'Erstellungsdatum:', key: 'erstellungsdatum', width: 30 },
            { header: 'Gebindenummer:', key: 'gebindenr', width: 30, numFmt: '@'},
            { header: 'NIO Grund:', key: 'nio', width: 10},
            { header: 'Position:', key: 'aktposition', width: 30}
        ];

        // Add Array Rows
        worksheet.addRows(jsonCustomers);

        // Write to File
        workbook.xlsx.writeFile("nio.xlsx")
            .then(function() {
                console.log("file saved!");
            });

        // -> Close MySQL connection
        con.end(function(err) {
            if (err) {
                return console.log('error:' + err.message);
            }
            console.log('Close the database connection.');
        });

        // -> Check 'customer.csv' file in root project folder
    });
});