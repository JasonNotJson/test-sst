import json
import uuid
from datetime import datetime
from utils import resp_handler, JsonPayloadBuilder, table


@resp_handler
def post_note(content, attachment, uid):

    dt_now = datetime.now().strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z'

    item = {
        'userId': uid,
        'noteId': str(uuid.uuid1()),
        'content': content,
        'attachment': attachment,
        'createdAt': dt_now
    }

    table.put_item(Item=item)

    body = JsonPayloadBuilder().add_status(
        True).add_data(item).add_message('').compile()
    return body


def handler(event, context):
    body = json.loads(event['body'])

    params = {
        "content": body["content"],
        "attachment": body["attachment"],
        "uid": event['requestContext']['identity']['cognitoIdentityId'],
    }
    return post_note(**params)

# {"content": "testing import utils", "attachment":"utils.jpg"}
