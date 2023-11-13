from fastapi import APIRouter
from settings.utils import get_config
from pydantic import BaseModel
from utils import reload_configs

router = APIRouter()

class SettingsModel(BaseModel):
    shunt_ohms: float
    buttons_tolerance: float
    maximum_value: float
    maximum_voltage: float
    minimum_voltage: float
    long_press_time: float
    double_click_interval: float
    read_delay: float
    descending_mode: bool

@router.get('/settings/')
async def read_settings_endpoint() -> SettingsModel:
    config = get_config()
    options = config.get_options()
    return options

@router.patch('/settings/', response_model=SettingsModel)
async def update_settings_endpoint(patch_data: SettingsModel):
    config = get_config()
    response = config.set_options(patch_data)
    reload_configs()
    return response.get_options()