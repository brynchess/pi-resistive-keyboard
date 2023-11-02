#to run headless on devrpi
#DISPLAY=":0" .venv/bin/python3 main.py
import uvicorn
from fastapi import FastAPI, staticfiles
from fastapi.middleware.cors import CORSMiddleware
from endpoints import buttons_endpoint, settings_endpoint, functions_endpoint, websockets

endpointsApp = FastAPI()
endpointsApp.include_router(settings_endpoint.router)
endpointsApp.include_router(buttons_endpoint.router)
endpointsApp.include_router(functions_endpoint.router)
endpointsApp.include_router(websockets.router)
endpointsApp.mount("/", staticfiles.StaticFiles(directory='build', html='true'), name='static')

origins = [
    "http://localhost",
    "http://127.0.0.1",
    "http://localhost:8000",
    "192.168.0.32"
]

endpointsApp.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"]
)

if __name__ == "__main__":
    from ina_integration.utils import ina
    uvicorn.run("main:endpointsApp", host="0.0.0.0", port=8000, log_level="info", reload=False)