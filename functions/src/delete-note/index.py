import json
from utils import resp_handler, JsonPayloadBuilder, table


@resp_handler
def delete_note(uid, note_id):

    key = {
        'userId': uid,
        'noteId': note_id
    }

    table.delete_item(Key=key)

    body = JsonPayloadBuilder().add_status(True).add_message(
        'Note deleted successfully').compile()
    return body


def handler(event, context):

    params = {
        "uid": event['requestContext']['identity']['cognitoIdentityId'],
        "note_id": event['pathParameters']['id'],
    }

    return delete_note(**params)
