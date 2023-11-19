from fastapi import APIRouter
from update.utils import update_manager

router = APIRouter()

@router.get('/update/')
async def read_keyoptions_endpoint():
    return update_manager.is_update_available()


@router.patch('/update/')
async def update_app_is_installed_endpoint():
    return update_manager.update()


@router.get('/restart/')
async def restart_backend_endpoint():
    update_manager.restart()
    return True