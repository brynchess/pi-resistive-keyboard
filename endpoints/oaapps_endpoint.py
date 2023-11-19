from fastapi import APIRouter
from pydantic import BaseModel
from external_apps.utils import apps_manager

router = APIRouter()

class AppsModel(BaseModel):
    item: list

class InstallModel(BaseModel):
    item: str

@router.get('/apps/')
async def read_apps_endpoint():
    apps = apps_manager.get_applications()
    return apps

@router.patch('/apps/')
async def update_apps_endpoint(patch_data: AppsModel):
    response = apps_manager.set_applications(patch_data.item)
    return response.get_applications()

@router.get('/install/')
async def read_app_is_installed_endpoint():
    return apps_manager.is_this_app_installed()

@router.patch('/install/')
async def update_app_is_installed_endpoint(patch_data: InstallModel):
    if patch_data.item == "install":
        return apps_manager.install_this_app()