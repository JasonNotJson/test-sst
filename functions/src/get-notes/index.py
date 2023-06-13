from utils import JsonPayloadBuilder, resp_handler, table
from boto3.dynamodb.conditions import Key


@resp_handler
def get_all_notes(uid):
    response = table.query(
        KeyConditionExpression=Key(
            'userId').eq(uid)
    )

    notes = response['Items']

    builder = JsonPayloadBuilder()
    body = builder.add_status(True).add_data(notes).compile()

    return body


def handler(event, context):

    params = {
        "uid": event['requestContext']['identity']['cognitoIdentityId'],
    }

    return get_all_notes(**params)
