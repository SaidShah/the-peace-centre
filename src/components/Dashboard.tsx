import "../styles/Dashboard.css";
import sunrise from "../assets/sunrise.png";
import sunset from "../assets/sunset.png";
import PrayerTimeContainer from "./PrayerTimeContainer";

const Dashboard = ({
  adhanTimes,
}: {
  adhanTimes: { data?: { timings?: { [key: string]: string } } };
}) => {
  let timings = adhanTimes?.data?.timings;
  if (timings) {
    timings = { ...timings, Jummah: "13:00" }; // 13:00 is 1:00 PM in 24-hour format
  }

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

    const convertTo12HourFormat = (time24: string) => {
      const [hours, minutes] = time24.split(":").map(Number);
      const period = hours >= 12 ? "PM" : "AM";
      const hours12 = hours % 12 || 12;
      return `${hours12}:${String(minutes).padStart(2, "0")} ${period}`;
    };
  
    const sunrise12Hour = timings ? convertTo12HourFormat(timings.Sunrise) : "";
    const sunset12Hour = timings ? convertTo12HourFormat(timings.Sunset) : "";

    if (timings) {
      timings = { ...timings, Jummah: "13:00" }; // Add Jummah
      const { Sunset, Sunrise, Imsak, Midnight, Firstthird, Lastthird, ...filteredTimings } = timings;
      timings = filteredTimings;
    }
  

  return (
    <div>
      {timings ? (
        <div>
          <div>
            <h1 className="masjid_name">MASJID ASSAKINA</h1>
            <p className="current_date">
              {formattedDate.toUpperCase()}
            </p>
          </div>

          <div
          className="header"
          >
            <div className="sunrise_container">
              <div className="image_text_container">
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
                {sunrise12Hour.toUpperCase()}
              </p>
            </div>
            <h1 className="current_time">{currentTime}</h1>
            <div className="sunrise_container">
              <div className="image_text_container">
                <img
                  src={sunset}
                  alt="Sunset"
                  className="sunrise_icon"
                />
                <p className='sunrise_text'>Sunset</p>
              </div>
              <p
                className="sunrise_time"
              >
                {sunset12Hour.toUpperCase()}
              </p>
            </div>
          </div>
          <div className="prayer_time_dash">
            {Object.entries(timings).map(([prayerName, time], index) => (
              <div
                key={prayerName}
                className="prayer_time_container"
              >
                <PrayerTimeContainer
                  prayerName={prayerName}
                  prayerTime={convertTo12HourFormat(time)}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading prayer times...</p>
      )}
    </div>
  );
};

export default Dashboard;
