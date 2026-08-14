import type { TripLocation } from '../types/trip';

type Props = { location: TripLocation; onBack: () => void; onEdit: () => void; onDelete: () => void };

export function DestinationDetail({ location, onBack, onEdit, onDelete }: Props) {
  return <main className="detailPage">
    <button className="backButton" onClick={onBack}>← Back to trip</button>
    <section className="detailHero">
      <div><div className="sectionLabel light">{location.day} · {location.category}</div><h1>{location.name}</h1><p>{location.district}{location.plannedDate ? ` · ${new Date(`${location.plannedDate}T00:00:00`).toLocaleDateString()}` : ' · Date not set'}</p></div>
      <div className="detailScore"><strong>{location.confidence}</strong><span>planning<br/>confidence</span></div>
    </section>
    <section className="detailBody">
      <article className="detailLead"><div className="sectionLabel">Before you go</div><h2>{location.note}</h2><p>This is trip-planning information saved in this browser. Confirm current road, weather, access and local restrictions before travelling.</p></article>
      <div className="detailFacts"><article><small>Road and transport</small><b>{location.access}</b></article><article><small>Walk or hike</small><b>{location.walk}</b></article><article><small>Parking</small><b>{location.parking}</b></article><article><small>Latest known condition</small><b>{location.condition}</b></article></div>
      <div className="detailActions"><button className="primary" onClick={onEdit}>Edit destination</button><button className="dangerButton" onClick={onDelete}>Delete from trip</button></div>
    </section>
  </main>;
}
