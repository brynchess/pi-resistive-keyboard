from fastapi import APIRouter
from settings.utils import get_config

router = APIRouter()
config = get_config()
options = config.get_options()

@router.get('/')
async def read_config_endpoint():
    return options