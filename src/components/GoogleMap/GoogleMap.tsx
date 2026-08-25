import "./GoogleMap.css";

interface GoogleMapProps {
  address: string;
}

const GoogleMap = ({ address }: GoogleMapProps) => {
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    address,
  )}&output=embed`;

  return (
    <div className="google-map">
      <iframe
        src={mapUrl}
        title={`Google Maps - ${address}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
};

export default GoogleMap;
