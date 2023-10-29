from fastapi import APIRouter, WebSocket
from ina_integration.utils import ina
from time import sleep

router = APIRouter()

@router.websocket("/value")
async def value_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        if (data == 'close'):
            await websocket.close()
            return
        await websocket.send_json(ina.get_value())