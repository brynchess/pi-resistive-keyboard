from fastapi import APIRouter
from settings.utils import get_config

router = APIRouter()

@router.get('/')
async def read_config_endpoint():
    config = get_config()
    options = config.get_options()
    return options