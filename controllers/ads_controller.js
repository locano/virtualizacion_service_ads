var mysql = require('mysql');

module.exports = {
    getAdvertisers (req, res) {
        var connection = mysql.createConnection({
            host: 'zyklusdb.ciohag68m4xh.us-east-2.rds.amazonaws.com',
            user: 'zykladmin',
            password: 'zyklus2017!',
            database: 'TST_advertising'
        });


        
        if (req.query['advertiser_campaigns'].length >= 1) {

            var param1 = req.query['advertiser_campaigns'].split(':');         
           
            var query = "CALL get_ads_service(?);";
            
            var params = [
            param1[0]
             ];

            console.log(param1);
            
                //Check if connection is OK
                connection.connect(function(error) {
                    if (error) {
                        connection.end();
                        console.log('ERROR - Could not connect to the database: ' + error.message);
                        res.status(500).send({
                            message: error.message
                        });
                    }
                });
                connection.query(query,params, function(error, results, fields) {
                    //Close connection
                    connection.end();

                    //Internal server error, return 500
                    if (error) {
                        console.log('ERROR - Problem with provided query: ' + error.message);
                        res.status(500).send({
                            message: error.message
                        });
                    }

                    //No records, return 404
                    if (results[0].length == 0) {
                        console.log('ERROR - No records found');
                        res.status(400).send({
                            message: 'ERROR - No records found'
                        });
                    } else {

                    //Found records
                    console.log('OK - Successful query: "' + query + '" with results: ' + results[0]);
                    res.status(200).send(results[0]);
                    }
                });
        } else {
            //Internal server error, return 500
            console.log('ERROR - Problem Problem ' + error.message);
            res.status(500).send({
                message: error.message
            });
        } //cierra if
    } 
};