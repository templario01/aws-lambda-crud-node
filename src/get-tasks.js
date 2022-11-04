const AWS = require("aws-sdk");

const getTasks = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const result = await dynamodb
      .scan({
        TableName: "TaskTable",
      })
      .promise();

    const tasks = result.Items;

    return {
      statusCode: 200,
      body: JSON.stringify({ tasks }),
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
  getTasks,
};
