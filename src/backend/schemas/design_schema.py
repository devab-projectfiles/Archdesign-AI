from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    role: str
    content: str

class DesignRequest(BaseModel):
    requirement: str
    history: list[ChatMessage] = Field(default_factory=list)

class DesignResponse(BaseModel):
    message: str
