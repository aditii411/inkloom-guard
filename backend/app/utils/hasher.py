import hashlib
import json

def calculate_sha256(content: str) -> str:
    return hashlib.sha256(content.encode("utf-8")).hexdigest()

def generate_audit_hash(doc_id: str, title: str, content: str, score: int, user: str, timestamp: str) -> str:
    payload = f"{doc_id}:{title}:{hashlib.sha256(content.encode()).hexdigest()}:{score}:{user}:{timestamp}"
    return calculate_sha256(payload)
