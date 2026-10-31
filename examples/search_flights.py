"""Cheapest flights for one route: python examples/search_flights.py (needs APIFY_TOKEN)."""
import os

from apify_client import ApifyClient

client = ApifyClient(os.environ["APIFY_TOKEN"])
run = client.actor("zaiq/google-flights-scraper").call(
    run_input={"origins": ["JFK"], "destinations": ["LAX"], "maxResultsPerSearch": 5},
    max_total_charge_usd=0.10,
)
rows = client.dataset(run.default_dataset_id).iterate_items()
flights = [r for r in rows if r.get("kind") == "flight"]
for f in sorted(flights, key=lambda r: r["price"]):
    print(f"{f['price']:>8} {f['currency']}  {f['airline']}, stops: {f['stops']}, {f['departureTime']} to {f['arrivalTime']}, {f['durationMinutes']} min")
