// Cheapest flights for one route: node examples/search_flights.mjs (needs APIFY_TOKEN)
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });
const run = await client.actor('zaiq/google-flights-scraper').call(
  { origins: ['JFK'], destinations: ['LAX'], maxResultsPerSearch: 5 },
  { maxTotalChargeUsd: 0.1 },
);
const { items } = await client.dataset(run.defaultDatasetId).listItems();
const flights = items.filter((r) => r.kind === 'flight').sort((a, b) => a.price - b.price);
for (const f of flights) {
  console.log(`${f.price} ${f.currency}  ${f.airline}, stops: ${f.stops}, ${f.departureTime} to ${f.arrivalTime}, ${f.durationMinutes} min`);
}
