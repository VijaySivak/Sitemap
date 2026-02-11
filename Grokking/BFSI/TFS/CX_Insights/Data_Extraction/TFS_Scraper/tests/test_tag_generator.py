import json
import os
import sys
import unittest
from unittest import mock
from urllib import error as url_error
from urllib import request as url_request

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "scripts")))

from tag_generator import (
    build_taxonomy,
    generate_tags,
    generate_tags_batch,
    parse_tag_response,
    validate_tags,
)


SAMPLE_TAXONOMY = build_taxonomy(
    {
        "primary": [
            "Payment Processing",
            "Customer Service",
            "Mobile App",
        ],
        "sentiment": ["Positive Experience", "Negative Experience"],
    }
)


class TagGeneratorTests(unittest.TestCase):
    def test_validate_tags_filters_unknown(self) -> None:
        tags = ["Payment Processing", "Unknown Tag", "Mobile App"]
        validated = validate_tags(tags, SAMPLE_TAXONOMY, 1, 5)
        self.assertEqual(validated, ["Payment Processing", "Mobile App"])

    def test_validate_tags_minimum(self) -> None:
        tags = ["Unknown Tag"]
        validated = validate_tags(tags, SAMPLE_TAXONOMY, 1, 5)
        self.assertEqual(validated, [])

    def test_parse_comma_separated(self) -> None:
        response = "Payment Processing, Customer Service, Negative Experience"
        parsed = parse_tag_response(response, SAMPLE_TAXONOMY)
        self.assertIn("Payment Processing", parsed)
        self.assertIn("Customer Service", parsed)

    def test_parse_json_format(self) -> None:
        response = '{"tags": ["Mobile App", "Positive Experience"]}'
        parsed = parse_tag_response(response, SAMPLE_TAXONOMY)
        self.assertIn("Mobile App", parsed)

    def test_parse_bullets(self) -> None:
        response = "- Payment Processing\n- Customer Service"
        parsed = parse_tag_response(response, SAMPLE_TAXONOMY)
        self.assertEqual(parsed, ["Payment Processing", "Customer Service"])

    def test_parse_numbered(self) -> None:
        response = "1. Payment Processing 2. Customer Service"
        parsed = parse_tag_response(response, SAMPLE_TAXONOMY)
        self.assertIn("Payment Processing", parsed)

    def test_batch_processing(self) -> None:
        reviews = [
            {"review_text": "Payment failed", "review_title": "Issue"},
            {"review_text": "Great support", "review_title": "Thanks"},
        ]
        with mock.patch("tag_generator.call_lm_studio") as mocked:
            mocked.side_effect = ["Payment Processing", "Customer Service, Positive Experience"]
            tags = generate_tags_batch(
                reviews,
                SAMPLE_TAXONOMY,
                "TITLE: {review_title}\nTEXT: {review_text}",
                "http://localhost",
                "model",
                0.1,
                50,
                1,
                1,
                1,
                5,
                0.0,
                None,
            )
        self.assertEqual(tags[0], ["Payment Processing"])
        self.assertIn("Customer Service", tags[1])

    def test_error_handling_returns_empty(self) -> None:
        with mock.patch("tag_generator.call_lm_studio") as mocked:
            mocked.side_effect = url_error.URLError("down")
            tags = generate_tags(
                "text",
                "title",
                SAMPLE_TAXONOMY,
                "TITLE: {review_title}\nTEXT: {review_text}",
                "http://localhost",
                "model",
                0.1,
                50,
                1,
                2,
                1,
                5,
                None,
            )
        self.assertEqual(tags, [])

    def test_lm_studio_connection(self) -> None:
        endpoint = os.environ.get("LM_STUDIO_ENDPOINT")
        if not endpoint:
            self.skipTest("LM_STUDIO_ENDPOINT not set")
        payload = {
            "model": "local-model",
            "messages": [{"role": "user", "content": "ping"}],
            "temperature": 0.0,
            "max_tokens": 1,
        }
        req = url_request.Request(
            endpoint,
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        try:
            with url_request.urlopen(req, timeout=2) as resp:
                self.assertTrue(resp.status in (200, 400, 401, 403, 404))
        except url_error.URLError:
            self.skipTest("LM Studio endpoint not reachable")


if __name__ == "__main__":
    unittest.main()
