import uvicorn
from fastapi import FastAPI
from endpoints import config_endpoint

endpointsApp = FastAPI()
endpointsApp.include_router(config_endpoint.router)

if __name__ == "__main__":
    uvicorn.run("main:endpointsApp", host="0.0.0.0", port=8000, log_level="info", reload=True)