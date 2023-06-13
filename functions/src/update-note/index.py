import json
from utils import resp_handler, JsonPayloadBuilder, table


@resp_handler
def update_note(note_id, content, attachment, uid):

    key = {
        'userId': uid,
        'noteId': note_id
    }

    update_expression = "SET content = :content, attachment = :attachment"
    expression_attribute_values = {
        ':content': content,
        ':attachment': attachment
    }

    table.update_item(
        Key=key,
        UpdateExpression=update_expression,
        ExpressionAttributeValues=expression_attribute_values
    )

    body = JsonPayloadBuilder().add_status(True).add_message(
        'Note updated successfully').compile()
    return body


def handler(event, context):

    body = json.loads(event['body'])

    params = {
        "note_id": event['pathParameters']['id'],
        "content": body["content"],
        "attachment": body["attachment"],
        "uid": event['requestContext']['identity']['cognitoIdentityId'],
    }

    return update_note(**params)
