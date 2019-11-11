const AWS = require("aws-sdk");
const crypto = require("crypto");

// We are generating unique id here
const generateUUID = () => crypto.randomBytes(16).toString("hex");

// Initialising the DynamoDB
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const { title } = JSON.parse(event.body);
  const params = {
    TableName: "novels", // This is the name of our Dynamo table
    Item: { // We are creating an item with a unique id and title
      id: generateUUID(),
      title: title
    }
  };
  try {
     // Utilize put method so that we can insert any item into the table
    const data = await documentClient.put(params).promise();
    const response = {
      statusCode: 200
    };
    return response; // It will return 200 if any item is inserted 
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }
};
