from fastapi import APIRouter
from pydantic import BaseModel
from settings.utils import get_config
from settings.keys_functions import oa_keys_functions

class Item(BaseModel):
    item: list

router = APIRouter()

@router.get('/key-options/')
async def read_keyoptions_endpoint():
    return oa_keys_functions

@router.get('/functions/')
async def read_functions_endpoint():
    config = get_config()
    return config.get_functions()

@router.patch('/functions/')
async def patch_functions_endpoint(item: Item):
    config = get_config()
    config.set_functions(item.item)
    return config.get_functions()