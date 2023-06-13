from boto3.dynamodb.conditions import Key
from utils import JsonPayloadBuilder
from utils import resp_handler
from utils import table


@resp_handler
def get_note(note_id, uid):
    response = table.get_item(
        Key={
            'userId': uid,  # Hard-coded userId
            'noteId': note_id
        }
    )
    builder = JsonPayloadBuilder()

    body = builder.add_status(True).add_data(response).compile()

    return body


def handler(event, context):

    params = {
        "note_id": event['pathParameters']['id'],
        "uid": event['requestContext']['identity']['cognitoIdentityId'],
    }

    return get_note(**params)
