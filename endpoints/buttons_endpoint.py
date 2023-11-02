from fastapi import APIRouter
from pydantic import BaseModel
from settings.utils import get_config
from utils import reload_configs


router = APIRouter()

@router.get('/buttons/')
async def read_config_endpoint():
    config = get_config()
    buttons = config.get_buttons()
    return buttons

class Item(BaseModel):
    item: list

@router.patch('/buttons/')
async def update_config_endpoint(item: Item):
    config = get_config()
    response = config.set_buttons(item.item)
    reload_configs()
    return response.get_buttons()