# Google Flights Scraper API

Get flight prices from Google Flights as clean JSON: price, airlines, stops, departure and arrival times, airports, duration and every layover, for any route and date, one way or round trip, in any cabin and currency. No login and no Google API key.

Google has no public Flights API, so this calls a hosted [Google Flights Scraper](https://apify.com/zaiq/google-flights-scraper) on Apify and hands you the rows. This repo holds the examples; the scraper itself runs in the cloud.

## Quick start

You need a free [Apify](https://apify.com) account and its API token.

**Python**

```bash
pip install apify-client
export APIFY_TOKEN=your_token
python examples/search_flights.py
```

**Node.js**

```bash
npm install apify-client
export APIFY_TOKEN=your_token
node examples/search_flights.mjs
```

**curl**

```bash
curl -X POST "https://api.apify.com/v2/acts/zaiq~google-flights-scraper/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"origins":["JFK"],"destinations":["LAX"],"departureDate":"2026-12-20","maxResultsPerSearch":5}'
```

## Input

| Field | Example | Notes |
|---|---|---|
| `origins` | `["JFK"]` | Airport codes or cities; every origin is paired with every destination |
| `destinations` | `["LAX"]` | Airport codes or cities |
| `departureDate` | `"2026-12-20"` | Empty means 30 days from today |
| `returnDate` | `"2026-12-28"` | Empty means one way |
| `flexDays` | `3` | Also search up to 3 days either side, to find the cheapest day |
| `adults` | `1` | Up to 9 |
| `cabin` | `"economy"` | `economy`, `premium`, `business` or `first` |
| `currency` | `"USD"` | Three-letter code |
| `maxStops` | `0` | Optional; 0 means nonstop only |
| `maxPrice` | `500` | Optional, in your currency |
| `maxResultsPerSearch` | `30` | Up to 100 for each route and date |

## Output

One row per itinerary. This is a sample with made-up values; see [examples/sample_output.json](examples/sample_output.json) for a whole row.

```json
{
  "origin": "JFK",
  "destination": "LAX",
  "tripType": "one way",
  "price": 129,
  "currency": "USD",
  "airline": "Sample Air",
  "stops": 1,
  "departureTime": "8:15 AM",
  "arrivalTime": "2:40 PM",
  "durationMinutes": 565,
  "layovers": [{ "durationMinutes": 70, "overnight": false, "airport": "Sample Hub Airport", "city": "Sample City" }],
  "priceSignal": "typical"
}
```

## What people use it for

- **Fare tracking:** run a route on a schedule and watch the price move
- **Finding the cheapest day:** search nearby dates and sort by price
- **Travel content:** real fares for deal pages and newsletters
- **Route research:** which airlines fly a route and how long it takes
- **AI agents:** add `https://mcp.apify.com?tools=zaiq/google-flights-scraper` to any MCP client

## Price

$0.004 per flight on Apify's pay-per-use plans, about $0.12 for a typical route and date. A search with no flights is free. Set a maximum cost per run and it stops there.

## Limits

- Round-trip prices are Google's from-price for that outbound; the return is picked next on Google Flights.
- Fares change quickly: recheck before booking, including bags and fare rules.
- Prices are as shown to a signed-out visitor.

## Licence

The examples in this repo are MIT licensed. The hosted scraper is a paid service on Apify.
