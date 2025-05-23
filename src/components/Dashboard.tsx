import "../styles/Dashboard.css";
import sunrise from "../assets/sunrise.png";

const Dashboard = ({
  adhanTimes,
}: {
  adhanTimes: { data?: { timings?: { [key: string]: string } } };
}) => {
  const timings = adhanTimes?.data?.timings;
  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const currentTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div>
      {timings ? (
        <div>
          <div
          className="header"
          >
            <div className="sunrise_container">
              <div style={{ display: "flex" }}>
                <img
                  src={sunrise}
                  alt="Sunrise"
                  className="sunrise_icon"
                />
                <p className='sunrise_text'>Sunrise</p>
              </div>
              <p
                className="sunrise_time"
              >
                {timings.Sunrise.toUpperCase()} AM
              </p>
            </div>
            <h1 className="masjid_name">MASJID ASSAKINA</h1>
            <p className="current_date">
              {formattedDate.toUpperCase()}
            </p>
          </div>
          <h1 className="current_time">{currentTime}</h1>
        </div>
      ) : (
        <p>Loading prayer times...</p>
      )}
    </div>
  );
};

export default Dashboard;
