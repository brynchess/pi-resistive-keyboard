import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from endpoints import buttons_endpoint, settings_endpoint, functions_endpoint

endpointsApp = FastAPI()
endpointsApp.include_router(settings_endpoint.router)
endpointsApp.include_router(buttons_endpoint.router)
endpointsApp.include_router(functions_endpoint.router)

origins = [
    "http://localhost",
    "http://127.0.0.1",
    "http://localhost:8000"
]

endpointsApp.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"]
)

if __name__ == "__main__":
    uvicorn.run("main:endpointsApp", host="0.0.0.0", port=8000, log_level="info", reload=True)