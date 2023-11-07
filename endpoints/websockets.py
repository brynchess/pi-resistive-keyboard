from fastapi import APIRouter, WebSocket
from keyboard.utils import keyboard
from ina_integration.utils import ina

router = APIRouter()

@router.websocket("/value")
async def value_endpoint(websocket: WebSocket):
    await websocket.accept()
    keyboard.set_settingsmode_on()
    while True:
        data = await websocket.receive_text()
        if (data == 'close'):
            await websocket.close()
            keyboard.set_settingsmode_off()
            return
        await websocket.send_json(keyboard.get_value())

@router.websocket("/voltage")
async def voltage_endpoint(websocket: WebSocket):
    await websocket.accept()
    keyboard.set_settingsmode_on()
    while True:
        data = await websocket.receive_text()
        if (data == 'close'):
            await websocket.close()
            keyboard.set_settingsmode_off()
            return
        await websocket.send_json(ina.get_voltage())