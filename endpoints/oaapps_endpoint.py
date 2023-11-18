from fastapi import APIRouter
from pydantic import BaseModel
from external_apps.utils import apps_manager

router = APIRouter()

class AppsModel(BaseModel):
    item: list

@router.get('/apps/')
async def read_apps_endpoint():
    apps = apps_manager.get_applications()
    return apps

@router.patch('/apps/')
async def update_apps_endpoint(patch_data: AppsModel):
    response = apps_manager.set_applications(patch_data.item)
    return response.get_applications()