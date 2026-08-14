import { useMemo, useState } from 'react';
import { assessReachability, type VehicleCategory } from '@travel-buddy/contracts';
import { demoDestination } from './demoData';

const vehicles: { value: VehicleCategory; label: string }[] = [
  { value: 'LOW_CLEARANCE_CAR', label: 'Low-clearance car' }, { value: 'STANDARD_CAR', label: 'Standard car' },
  { value: 'HIGH_CLEARANCE_CAR', label: 'High-clearance car' }, { value: 'SUV_4X4', label: 'SUV / 4×4' },
  { value: 'MOTORBIKE', label: 'Motorbike' }, { value: 'TUK_TUK', label: 'Tuk-tuk' }
];

export function App() {
  const [vehicle, setVehicle] = useState<VehicleCategory>('LOW_CLEARANCE_CAR');
  const [maxWalk, setMaxWalk] = useState(2000);
  const result = useMemo(() => assessReachability(demoDestination, { destinationId: demoDestination.id, vehicleCategory: vehicle, passengerCount: 2, maxWalkingDistanceMeters: maxWalk, travellingWithChildren: false, travellingWithElderly: false }, new Date('2026-08-14')), [vehicle, maxWalk]);

  return <>
    <header className="nav"><a className="brand" href="#top"><span>TB</span> Travel Buddy Reach</a><nav><a href="#how">How it works</a><a href="#access">Access profile</a><a href="#buddy">Ask Buddy</a></nav><button className="navCta">Explore Sri Lanka</button></header>
    <main id="top">
      <section className="hero">
        <div className="eyebrow">Last-mile travel intelligence for Sri Lanka</div>
        <h1>Maps show the place.<br/><em>We show the way in.</em></h1>
        <p>Know the road, the right vehicle, where to park, how far to walk—and whether recent travellers actually made it.</p>
        <div className="heroActions"><button className="primary">Find a reachable place</button><a href="#access">See a real access profile →</a></div>
        <div className="trust"><span>✓ Community-verified</span><span>✓ Condition timestamps</span><span>✓ English · සිංහල · தமிழ்</span></div>
      </section>

      <section className="problem" id="how">
        <div><div className="sectionLabel">The last turn problem</div><h2>A map pin is only half the journey.</h2><p>A waterfall can look one easy turn away. Then the paved road ends, parking is unclear, and a 1.4 km muddy trail begins.</p></div>
        <div className="mapCard"><div className="mapRoad"></div><div className="pin">●</div><div className="mapLabel"><b>Bomburu Ella</b><span>“You have arrived”</span></div><div className="hidden"><b>What the map missed</b><span>2.1 km narrow road</span><span>Limited earth parking</span><span>1.4 km forest walk</span><span>Muddy after recent rain</span></div></div>
      </section>

      <section className="profile" id="access">
        <div className="profileTop"><div><div className="sectionLabel light">Live access profile</div><h2>{demoDestination.name}</h2><p>{demoDestination.district} · {demoDestination.category}</p></div><div className="score"><strong>{demoDestination.confidenceScore}</strong><span>Journey<br/>confidence</span></div></div>
        <div className="status"><span className="dot"></span><b>Muddy access reported</b><span>Updated 6 days ago</span></div>
        <div className="journey">
          {demoDestination.accessSegments.map((segment, index) => <div className="segment" key={segment.id}><div className="step">{index + 1}</div><div><small>{segment.type.replace('_', ' ')}</small><b>{segment.title}</b><span>{segment.distanceMeters ? `${(segment.distanceMeters / 1000).toFixed(1)} km` : 'Stop here'} · {segment.surface}</span></div></div>)}
        </div>
        <div className="facts"><div><small>Park at</small><b>Community parking</b></div><div><small>Walk</small><b>1.4 km · Moderate</b></div><div><small>Signal</small><b>Weak on trail</b></div></div>
      </section>

      <section className="assessment">
        <div><div className="sectionLabel">Personalised answer</div><h2>Can I go?</h2><p>Try a vehicle and walking limit. The result explains the evidence—not just a yes or no.</p><label>My vehicle<select value={vehicle} onChange={(event) => setVehicle(event.target.value as VehicleCategory)}>{vehicles.map((v) => <option key={v.value} value={v.value}>{v.label}</option>)}</select></label><label>Maximum walk<select value={maxWalk} onChange={(event) => setMaxWalk(Number(event.target.value))}><option value="500">500 m</option><option value="1000">1 km</option><option value="2000">2 km</option><option value="5000">5 km</option></select></label></div>
        <article className={`result ${result.outcome.toLowerCase()}`}><small>YOUR ASSESSMENT</small><h3>{result.headline}</h3>{result.reasons.map((reason) => <p key={reason}>✓ {reason}</p>)}<div className="evidence">Based on {demoDestination.sourceSummary.verifiedJourneys} verified journeys · {demoDestination.confidenceScore}% confidence</div><small>{result.disclaimer}</small></article>
      </section>

      <section className="buddy" id="buddy"><div><div className="sectionLabel light">Ask Buddy</div><h2>Ask the question a map can’t answer.</h2><p>Answers separate verified journeys, community reports and general guidance—with timestamps attached.</p></div><div className="chat"><div className="userMsg">Can five people reach this waterfall in a Suzuki Alto after rain?</div><div className="botMsg"><b>Alternative transport recommended</b><p>A low-clearance car is not recently confirmed for the final 2.1 km. Park earlier or use a local tuk-tuk. Expect a 1.4 km moderate walk; the trail was reported muddy 6 days ago.</p><span>14 verified journeys · 84% confidence</span></div><div className="chatInput">Ask about vehicle, parking, walking… <b>↑</b></div></div></section>

      <section className="alternatives"><div className="sectionLabel">When the answer is “not today”</div><h2>Find somewhere that fits instead.</h2><div className="altGrid"><article><span>78% confidence</span><h3>Devon Falls viewpoint</h3><p>Roadside viewpoint · 120 m walk</p></article><article><span>81% confidence</span><h3>Single Tree Hill</h3><p>Paved access · 600 m walk</p></article><article><span>76% confidence</span><h3>Lipton’s Seat</h3><p>Standard car · 350 m walk</p></article></div></section>
    </main>
    <footer><div className="brand"><span>TB</span> Travel Buddy Reach</div><p>Don’t just find it. Know how to reach it.</p><small>Travel guidance is not a safety guarantee. Confirm current local conditions.</small></footer>
  </>;
}

