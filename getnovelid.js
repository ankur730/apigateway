const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const {
    pathParameters: { id }
  } = event; // We are extracting an ID here
  const params = {
    TableName: "novels", // This is the name of our Dynamo
    Key: { id } // This is the key through which we will find the item
  };
  try {
    // We will use get method to retrieve novel with specific id
    const data = await documentClient.get(params).promise();
    const response = {
      statusCode: 200,
      body: JSON.stringify(data.Item)
    };
    return response;
  } catch (e) {
    return {
      statusCode: 500
    };
  }
};
