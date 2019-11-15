const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-1" });

exports.handler = (event, context, callback) => {

  const params = {
    TableName: "USER_INFO",
    Key: {
      "email": event.email
    },
    UpdateExpression: "set events = :a",
    ExpressionAttributeValues: {
      ":a": event.events
    },
    ReturnValues: "UPDATED_NEW"
  };
  docClient.update(params, function (err, data) {

    let recordReturned = data.Attributes;

    if (err) {

      data = {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: {
          message: JSON.stringify('ERROR, did not add event.')
        }
      };
      callback(null, data);

    } else {

      data = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: {

          message: JSON.stringify('Successful update to add event'),
          events: recordReturned.events
        }

      };

      callback(null, data);

    }
  })
};
