import { useEffect, useState, type FormEvent } from 'react';
import { destinationCategories, type TripLocation, type TripLocationDraft } from '../types/trip';

type Props = {
  location?: TripLocation;
  nextDay: number;
  onCancel: () => void;
  onSave: (draft: TripLocationDraft) => void;
};

function initialDraft(location: TripLocation | undefined, nextDay: number): TripLocationDraft {
  return location ?? {
    name: '', district: '', category: 'Viewpoint', day: `Day ${nextDay}`, plannedDate: '',
    access: '', walk: '', parking: '', condition: '', confidence: 50,
    latitude: 7.8731, longitude: 80.7718, note: ''
  };
}

export function DestinationForm({ location, nextDay, onCancel, onSave }: Props) {
  const [draft, setDraft] = useState(() => initialDraft(location, nextDay));
  useEffect(() => setDraft(initialDraft(location, nextDay)), [location, nextDay]);
  const update = <K extends keyof TripLocationDraft>(key: K, value: TripLocationDraft[K]) => setDraft((current) => ({ ...current, [key]: value }));
  const submit = (event: FormEvent) => {
    event.preventDefault();
    onSave({ ...draft, name: draft.name.trim(), district: draft.district.trim() });
  };

  return <div className="dialogBackdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
    <section className="plannerDialog" role="dialog" aria-modal="true" aria-labelledby="planner-title">
      <div className="dialogHeader"><div><small>{location ? 'Update itinerary' : 'New itinerary stop'}</small><h2 id="planner-title">{location ? `Edit ${location.name}` : 'Add a destination'}</h2></div><button className="iconButton" onClick={onCancel} aria-label="Close">×</button></div>
      <form onSubmit={submit} className="destinationForm">
        <label className="wide">Destination name<input required value={draft.name} onChange={(e) => update('name', e.target.value)} placeholder="e.g. Nine Arches Bridge" /></label>
        <label>District<input required value={draft.district} onChange={(e) => update('district', e.target.value)} placeholder="Badulla" /></label>
        <label>Category<select value={draft.category} onChange={(e) => update('category', e.target.value as TripLocationDraft['category'])}>{destinationCategories.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Trip order<input required value={draft.day} onChange={(e) => update('day', e.target.value)} placeholder="Day 1" /></label>
        <label>Planned date<input type="date" value={draft.plannedDate} onChange={(e) => update('plannedDate', e.target.value)} /></label>
        <label className="wide">Road and transport access<input required value={draft.access} onChange={(e) => update('access', e.target.value)} placeholder="Standard car to the trailhead" /></label>
        <label>Walk or hike<input required value={draft.walk} onChange={(e) => update('walk', e.target.value)} placeholder="1.2 km · Moderate" /></label>
        <label>Parking<input required value={draft.parking} onChange={(e) => update('parking', e.target.value)} placeholder="Limited roadside parking" /></label>
        <label>Latest condition<input required value={draft.condition} onChange={(e) => update('condition', e.target.value)} placeholder="Slippery after rain" /></label>
        <label>Confidence: {draft.confidence}%<input type="range" min="0" max="100" value={draft.confidence} onChange={(e) => update('confidence', Number(e.target.value))} /></label>
        <fieldset className="wide markerFields"><legend>Map coordinates</legend><label>Latitude<input required type="number" min="5.8" max="10" step="0.000001" value={draft.latitude} onChange={(e) => update('latitude', Number(e.target.value))} /></label><label>Longitude<input required type="number" min="79.5" max="82" step="0.000001" value={draft.longitude} onChange={(e) => update('longitude', Number(e.target.value))} /></label><small>Use coordinates from a trusted map source and verify the exact public access point.</small></fieldset>
        <label className="wide">Planning notes<textarea required rows={4} value={draft.note} onChange={(e) => update('note', e.target.value)} placeholder="What should the group confirm before travelling?" /></label>
        <div className="formActions wide"><button type="button" className="secondaryButton" onClick={onCancel}>Cancel</button><button className="primary" type="submit">{location ? 'Save changes' : 'Add to our trip'}</button></div>
      </form>
    </section>
  </div>;
}
