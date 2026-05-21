from fastapi import HTTPException
from src.backend.services.design_service import generate_design_service
from src.backend.schemas.design_schema import DesignRequest

def process_design_request(request: DesignRequest) -> dict:
    try:
        result = generate_design_service(request.requirement, request.history)
        if "error" in result:
            raise HTTPException(status_code=500, detail=result["error"])
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
