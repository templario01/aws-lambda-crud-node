const AWS = require("aws-sdk");

const updateTask = async (event) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;
    const { done, description, title } = JSON.parse(event.body);

    const result = await dynamodb
      .update({
        TableName: "TaskTable",
        Key: {
          id,
        },
        UpdateExpression:
          "set done = :done, title = :title, description = :description",
        ExpressionAttributeValues: {
          ":done": done,
          ":title": title,
          ":description": description,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();
    

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "task updated successfully", data: result.$response.data }),
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
  updateTask,
};
