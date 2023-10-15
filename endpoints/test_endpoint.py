from fastapi import APIRouter

router = APIRouter()

@router.get('/')
async def read_test_endpoint():
    return {"test": "test"}