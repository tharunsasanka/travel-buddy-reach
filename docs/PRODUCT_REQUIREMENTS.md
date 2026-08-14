# Product requirements

## Product statement

Travel Buddy Reach is a Sri Lankan community-powered destination reachability and last-mile travel intelligence platform. Its primary question is: **Can this particular traveller realistically reach this destination under the current known conditions?**

## Core traveller experience

Every destination explains the main route, final vehicle road, parking point, walking or hiking segment, landmarks, road and trail surfaces, suitable vehicles, public transport, facilities, connectivity, current issues, evidence source, and information freshness.

The ordered Access Graph is:

1. Main road
2. Final access road
3. Vehicle stopping or parking point
4. Walking or hiking trail
5. Final destination

## Personalisation

The private Vehicle Passport records vehicle/clearance category, normal passenger count, preferred transport, walking limit, accessibility needs, budget preference, group needs, and languages. `Can I Go?` compares this profile with current destination evidence and returns one of:

- Suitable
- Suitable with caution
- Alternative transport recommended
- Insufficient recent information
- Currently unsuitable

Every result includes evidence, timestamps, confidence, limitations, and a no-safety-guarantee notice.

## Evidence and community

- Journey Confidence Score decays as evidence ages.
- Verified Journey reports capture completed segments without publicly exposing exact private journey history.
- Temporary place conditions always have observation and expiry timestamps.
- Route Replay strips private starting points and unrelated journey sections.
- Landmark navigation supports English, Sinhala and Tamil instructions.
- Public transport chains record each leg, boarding point, time, approximate fare, walking, alternatives and confirmation date.
- Recent-traveller questions use an opt-in relay and disclose no contact or live-location data.
- Place Guardians can confirm information but never own destination pages or bypass moderation.
- Responsible Reveal protects restricted or environmentally vulnerable places.

## Ask Buddy

Ask Buddy retrieves approved Travel Buddy evidence before responding in English, Sinhala or Tamil. Answers distinguish verified journeys, community observations, official information and general guidance. They include relevant segments, vehicle fit, walking, score, timestamps, alternatives and links.

## First Android release

The first APK includes secure accounts, guest browsing, profiles, Vehicle Passport, Sri Lanka map/search/categories, destination profiles, Access Graph, Access Intelligence Card, parking/walking/vehicle suitability, Verified Journey foundations, timestamped reports, confidence score, basic assessment and Ask Buddy, photos, reviews/questions, saved destinations, reporting and an administration moderation queue.

## Launch dataset

Prepare 20–30 deeply documented waterfalls, trails, viewpoints, remote beaches, camping/forest areas, rural heritage locations and other places where directions or vehicle suitability are genuinely confusing. Completeness is more important than destination count.

## Success measures

Users can identify the correct final route and parking point, understand vehicle and walking requirements, see recently confirmed conditions and confidence, get an evidence-based natural-language answer, and receive a suitable alternative when their first choice is not appropriate.

