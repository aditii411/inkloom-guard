import pytest
from app.ai.rule_engine import rule_engine

def test_rule_engine_detects_violations():
    sample_text = "OMG!! Our new product is INSANELY FAST! It is 100% guaranteed to beat every competitor. Get the craziest deal NOW! Don't miss this insane opportunity!"
    violations = rule_engine.scan_content(sample_text)
    
    assert len(violations) >= 6
    categories = {v["category"] for v in violations}
    assert "Tone & Style" in categories
    assert "Factual Claims" in categories
    assert "Terminology & Glossary" in categories

def test_rule_engine_calculates_compliance_score():
    sample_text = "OMG!! Our new product is INSANELY FAST! It is 100% guaranteed to beat every competitor. Get the craziest deal NOW! Don't miss this insane opportunity!"
    violations = rule_engine.scan_content(sample_text)
    score = rule_engine.calculate_score(violations)
    
    # Score should be significantly reduced due to high and medium severity issues
    assert score < 60
