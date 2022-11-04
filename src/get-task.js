const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const getTask = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;

    const result = await dynamodb
      .get({
        TableName: "TaskTable",
        Key: {
          id,
        },
      })
      .promise();
    const task = result.Item;

    return {
      statusCode: 200,
      body: JSON.stringify({ task }),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 409,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

module.exports = {
  getTask,
};
