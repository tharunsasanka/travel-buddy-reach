import { useEffect, useMemo, useState } from 'react';
import { assessReachability, type VehicleCategory } from '@travel-buddy/contracts';
import heroBackground from './assets/sri-lanka-hero.webp';
import { demoDestination } from './demoData';
import { SriLankaMap } from './SriLankaMap';
import { DestinationDetail } from './components/DestinationDetail';
import { DestinationForm } from './components/DestinationForm';
import { createLocationId, loadTripLocations, restoreStarterLocations, saveTripLocations } from './services/tripStorage';
import { cloudEnabled, loadCloudTrip, syncCloudTrip } from './services/tripCloud';
import type { TripLocation, TripLocationDraft } from './types/trip';

const vehicles: { value: VehicleCategory; label: string }[] = [
  { value: 'LOW_CLEARANCE_CAR', label: 'Low-clearance car' },
  { value: 'STANDARD_CAR', label: 'Standard car' },
  { value: 'HIGH_CLEARANCE_CAR', label: 'High-clearance car' },
  { value: 'SUV_4X4', label: 'SUV / 4×4' },
  { value: 'MOTORBIKE', label: 'Motorbike' },
  { value: 'TUK_TUK', label: 'Tuk-tuk' }
];
const categories = ['All', 'Waterfall', 'Viewpoint', 'Hike', 'Forest', 'Beach', 'Culture', 'Other'] as const;

export function App() {
  const [locations, setLocations] = useState<TripLocation[]>(loadTripLocations);
  const [vehicle, setVehicle] = useState<VehicleCategory>('LOW_CLEARANCE_CAR');
  const [maxWalk, setMaxWalk] = useState(2000);
  const [category, setCategory] = useState<(typeof categories)[number]>('All');
  const [selectedId, setSelectedId] = useState(() => locations[0]?.id ?? '');
  const [formMode, setFormMode] = useState<'closed' | 'add' | 'edit'>('closed');
  const [detailId, setDetailId] = useState(() => window.location.hash.startsWith('#destination/') ? decodeURIComponent(window.location.hash.slice(13)) : '');
  const [cloudStatus, setCloudStatus] = useState<'local' | 'loading' | 'saved' | 'error'>(cloudEnabled ? 'loading' : 'local');
  const selectedLocation = locations.find((location) => location.id === selectedId) ?? locations[0];
  const detailLocation = locations.find((location) => location.id === detailId);
  const filteredLocations = category === 'All' ? locations : locations.filter((location) => location.category === category);
  const result = useMemo(() => assessReachability(demoDestination, { destinationId: demoDestination.id, vehicleCategory: vehicle, passengerCount: 2, maxWalkingDistanceMeters: maxWalk, travellingWithChildren: false, travellingWithElderly: false }, new Date('2026-08-14')), [vehicle, maxWalk]);

  useEffect(() => saveTripLocations(locations), [locations]);
  useEffect(() => {
    if (!cloudEnabled) return;
    loadCloudTrip().then((saved) => {
      if (saved?.length) { setLocations(saved); setSelectedId(saved[0]!.id); setCloudStatus('saved'); }
      else setCloudStatus('local');
    }).catch(() => setCloudStatus('error'));
  }, []);
  useEffect(() => {
    const syncHash = () => setDetailId(window.location.hash.startsWith('#destination/') ? decodeURIComponent(window.location.hash.slice(13)) : '');
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  const saveDestination = (draft: TripLocationDraft) => {
    if (formMode === 'edit' && selectedLocation) {
      setLocations((current) => current.map((item) => item.id === selectedLocation.id ? { ...draft, id: item.id } : item));
    } else {
      const location = { ...draft, id: createLocationId(draft.name) };
      setLocations((current) => [...current, location]);
      setSelectedId(location.id);
    }
    setFormMode('closed');
  };
  const openDetail = (id: string) => { setSelectedId(id); window.location.hash = `destination/${encodeURIComponent(id)}`; };
  const closeDetail = () => { history.pushState('', document.title, window.location.pathname + window.location.search); setDetailId(''); };
  const deleteDestination = (id: string) => {
    const location = locations.find((item) => item.id === id);
    if (!location || !window.confirm(`Remove ${location.name} from the trip?`)) return;
    const remaining = locations.filter((item) => item.id !== id);
    setLocations(remaining);
    setSelectedId(remaining[0]?.id ?? '');
    closeDetail();
  };
  const syncToCloud = async () => {
    setCloudStatus('loading');
    try { await syncCloudTrip(locations); setCloudStatus('saved'); }
    catch { setCloudStatus('error'); }
  };

  if (detailLocation) return <><DestinationDetail location={detailLocation} onBack={closeDetail} onEdit={() => { setSelectedId(detailLocation.id); setFormMode('edit'); }} onDelete={() => deleteDestination(detailLocation.id)} />{formMode === 'edit' && <DestinationForm location={detailLocation} nextDay={locations.length + 1} onCancel={() => setFormMode('closed')} onSave={saveDestination} />}</>;

  return <>
    <header className="nav">
      <a className="brand" href="#top"><span>TB</span><b>Travel Buddy Reach</b></a>
      <nav><a href="#trip">Our trip</a><a href="#map">Map</a><a href="#access">Access profile</a><a href="#buddy">Ask Buddy</a></nav>
      <button className="navCta" onClick={() => setFormMode('add')}>Add destination</button>
    </header>
    <main id="top">
      <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(8,45,35,.92) 0%, rgba(8,45,35,.72) 40%, rgba(8,45,35,.08) 76%), url(${heroBackground})` }}>
        <div className="heroContent"><div className="eyebrow light">Our Sri Lanka journey · Reachability first</div><h1>We’re planning the places.<br/><em>Now let’s plan the way in.</em></h1><p>Add the destinations your group wants to visit, then document the road, parking, walking route and latest known conditions before the trip.</p><div className="heroActions"><a className="primary" href="#trip">Explore our planned stops</a><a className="textLink" href="#map">Open the Sri Lanka map →</a></div><div className="heroStats"><div><strong>{locations.length}</strong><span>planned stops</span></div><div><strong>5</strong><span>access stages</span></div><div><strong>Local</strong><span>browser saved</span></div></div></div>
      </section>
      <section className="notice"><b>Planning prototype</b><span>The locations below demonstrate how your group’s itinerary can work. Replace them with your real planned visits and verify every access claim before publishing.</span></section>

      <section className="tripSection" id="trip">
        <div className="sectionHeading"><div><div className="sectionLabel">Build the journey</div><h2>Places on our route</h2><p>Add, update and remove stops. Your plan is saved locally, with optional PostgreSQL cloud sync when the API is configured.</p></div><div className="plannerTools"><button className="primary" onClick={() => setFormMode('add')}>+ Add destination</button>{cloudEnabled && <button className="secondaryButton" onClick={syncToCloud} disabled={cloudStatus === 'loading'}>{cloudStatus === 'loading' ? 'Syncing…' : cloudStatus === 'saved' ? '✓ Saved to cloud' : cloudStatus === 'error' ? 'Retry cloud sync' : 'Save to cloud'}</button>}<button className="secondaryButton" onClick={() => { if (window.confirm('Restore the six example destinations? This replaces the current list.')) { const restored = restoreStarterLocations(); setLocations(restored); setSelectedId(restored[0]?.id ?? ''); } }}>Restore examples</button></div></div>
        <div className="filters tripFilters">{categories.map((item) => <button className={category === item ? 'active' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div>
        {filteredLocations.length ? <div className="locationGrid">{filteredLocations.map((location) => <article className={selectedId === location.id ? 'locationCard selected' : 'locationCard'} key={location.id} onClick={() => setSelectedId(location.id)}><div className="cardTop"><span>{location.day}{location.plannedDate ? ` · ${location.plannedDate}` : ''}</span><span>{location.confidence}% confidence</span></div><small>{location.district} · {location.category}</small><h3>{location.name}</h3><div className="locationFacts"><span>🚙 {location.access}</span><span>🥾 {location.walk}</span><span>◉ {location.condition}</span></div><div className="cardActions"><button onClick={() => openDetail(location.id)}>Open details</button><button onClick={() => { setSelectedId(location.id); setFormMode('edit'); }}>Edit</button></div></article>)}</div> : <div className="emptyState"><h3>No destinations here yet.</h3><p>Add your first stop or choose another category.</p><button className="primary" onClick={() => setFormMode('add')}>Add a destination</button></div>}
      </section>

      <section className="mapSection" id="map">
        <div className="mapCopy"><div className="sectionLabel light">Sri Lanka trip map</div><h2>See the route as a whole.</h2><p>Select a marker to review what still needs to be confirmed before your group travels.</p>{selectedLocation ? <article className="selectedPlace"><small>{selectedLocation.day} · {selectedLocation.category}</small><h3>{selectedLocation.name}</h3><p>{selectedLocation.note}</p><div><span>{selectedLocation.walk}</span><strong>{selectedLocation.confidence}%</strong></div><button onClick={() => openDetail(selectedLocation.id)}>Open destination details →</button></article> : <article className="selectedPlace"><h3>Your map is ready.</h3><p>Add a destination to place the first marker.</p></article>}</div>
        <SriLankaMap locations={locations} selectedId={selectedId} onSelect={setSelectedId}/>
      </section>

      <section className="problem"><div><div className="sectionLabel">Why Reach exists</div><h2>A pin is only half the journey.</h2><p>The normal map can finish while the hard part is only beginning. Reach records the final road, stopping point, walking section, landmarks and freshness of the information.</p></div><div className="lastMile"><span>01</span><b>Main road</b><span>02</span><b>Final access</b><span>03</span><b>Parking</b><span>04</span><b>Walk or hike</b><span>05</span><b>Destination</b></div></section>

      <section className="profile" id="access">
        <div className="profileTop"><div><div className="sectionLabel light">Detailed example</div><h2>{demoDestination.name}</h2><p>{demoDestination.district} · {demoDestination.category}</p></div><div className="score"><strong>{demoDestination.confidenceScore}</strong><span>Journey<br/>confidence</span></div></div>
        <div className="status"><span className="dot"></span><b>Muddy access reported</b><span>Prototype timestamp · verify before use</span></div>
        <div className="journey">{demoDestination.accessSegments.map((segment, index) => <div className="segment" key={segment.id}><div className="step">{index + 1}</div><div><small>{segment.type.replace('_', ' ')}</small><b>{segment.title}</b><span>{segment.distanceMeters ? `${(segment.distanceMeters / 1000).toFixed(1)} km` : 'Stop here'} · {segment.surface}</span></div></div>)}</div>
        <div className="facts"><div><small>Park at</small><b>Community parking</b></div><div><small>Walk</small><b>1.4 km · Moderate</b></div><div><small>Confirm</small><b>Road after rain</b></div></div>
      </section>

      <section className="assessment"><div><div className="sectionLabel">Personalised answer</div><h2>Can I go?</h2><p>Try a vehicle and walking limit. The result explains the evidence rather than offering a simplistic yes or no.</p><label>My vehicle<select value={vehicle} onChange={(event) => setVehicle(event.target.value as VehicleCategory)}>{vehicles.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label><label>Maximum walk<select value={maxWalk} onChange={(event) => setMaxWalk(Number(event.target.value))}><option value="500">500 m</option><option value="1000">1 km</option><option value="2000">2 km</option><option value="5000">5 km</option></select></label></div><article className="result"><small>YOUR PROTOTYPE ASSESSMENT</small><h3>{result.headline}</h3>{result.reasons.map((reason) => <p key={reason}>✓ {reason}</p>)}<div className="evidence">Demonstration evidence · {demoDestination.confidenceScore}% confidence</div><small>{result.disclaimer}</small></article></section>

      <section className="nextFeatures"><div className="sectionLabel">Where the project can grow</div><h2>More than a location list.</h2><div className="featureGrid"><article><span>01</span><h3>Editable group itinerary</h3><p>Add dates, owners, planned stops and decisions for the places your group will visit.</p></article><article><span>02</span><h3>Transport chains</h3><p>Document train, bus, tuk-tuk and walking legs with fares and confirmation dates.</p></article><article><span>03</span><h3>Field verification</h3><p>Turn your actual visits into privacy-safe route and condition evidence.</p></article><article><span>04</span><h3>Offline trip packs</h3><p>Save access notes, landmarks and emergency guidance before signal disappears.</p></article></div></section>

      <section className="buddy" id="buddy"><div><div className="sectionLabel light">Ask Buddy</div><h2>Ask what a normal map can’t answer.</h2><p>Future answers can use your planned itinerary, Vehicle Passport and verified field notes—with sources and timestamps attached.</p></div><div className="chat"><div className="userMsg">Which stops fit our car and a 2 km walking limit?</div><div className="botMsg"><b>Start with the confirmed access profiles</b><p>Bomburu Ella needs caution on the final road. Lipton’s Seat has a shorter walk, while Riverston still needs a newer vehicle confirmation.</p><span>Prototype guidance · field verification required</span></div><div className="chatInput">Ask about the trip plan… <b>↑</b></div></div></section>
    </main>
    <footer><div><div className="brand inverted"><span>TB</span><b>Travel Buddy Reach</b></div><p>Don’t just find it. Know how to reach it.</p></div><div className="developerCredit"><b>Designed and developed by Tharun Sasanka</b><span>Independent Sri Lankan travel-technology project</span></div><small>Travel guidance is not a safety guarantee. Verify local conditions and respect access restrictions.</small></footer>
    {formMode !== 'closed' && <DestinationForm location={formMode === 'edit' ? selectedLocation : undefined} nextDay={locations.length + 1} onCancel={() => setFormMode('closed')} onSave={saveDestination} />}
  </>;
}
