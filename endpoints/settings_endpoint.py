from fastapi import APIRouter
from settings.utils import get_config
from misc.utils import convert_dict_values_to_numbers
from pydantic import BaseModel

router = APIRouter()

class SettingsModel(BaseModel):
    shunt_ohms: float
    base_voltage: float
    maximum_value: float
    zero_level_offset: float
    buttons_tolerance: float
    long_press_time: float
    double_click_interval: float
    read_delay: float
    base_value: float

@router.get('/settings/')
async def read_settings_endpoint() -> SettingsModel:
    config = get_config()
    options = config.get_options()
    return options

@router.patch('/settings/', response_model=SettingsModel)
async def update_settings_endpoint(patch_data: SettingsModel):
    config = get_config()
    response = config.set_options(patch_data)
    return response.get_options()