import "../styles/Dashboard.css";
import sunrise from "../assets/sunrise.png";
import sunset from "../assets/sunset.png";
import PrayerTimeContainer from "./PrayerTimeContainer";
import { useState, useEffect } from "react";

  type IqamaData = {
  is_manual_iqama?: boolean;
  fajr?: number;
  dhuhr?: number;
  asr?: number;
  maghrib?: number;
  isha?: number;
};

const Dashboard = ({
  adhanTimes,
  currentTime,
  iqamaData
}: {
  adhanTimes: { data?: { timings?: { [key: string]: string } } },
  currentTime: Date;
  iqamaData:  IqamaData;
}) => {
  const [nextPrayerMinutes, setNextPrayerMinutes] = useState<{[key: string]: string}>({});
  const [closestPrayer, setClosestPrayer] = useState<{ name: string; minutes: number } | null>(null);


  let timings = adhanTimes?.data?.timings;
  if (timings) {
    timings = { ...timings, Jummah: "13:00" }; // 13:00 is 1:00 PM in 24-hour format
  }

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const currentTimeHere = currentTime.toLocaleTimeString("en-US", {
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

    const toArabic = (prayerName: string) => {
      switch (prayerName) {
        case 'Fajr':
          return 'الفجر'
        case 'Dhuhr':
          return 'الظهر'
        case 'Asr':
          return 'العصر'
        case 'Maghrib':
          return 'المغرب'
        case 'Isha':
          return 'العشاء'
        case 'Jummah':
          return 'جمعة'
      }
    }

    useEffect(() => {
      // Find the closest prayer
      if (Object.keys(nextPrayerMinutes).length > 0) {
        let smallestMinutes = Infinity;
        let closestPrayerName = "";
  
        Object.entries(nextPrayerMinutes).forEach(([prayerName, minutes]) => {
          const minutesAsNumber = parseInt(minutes, 10);
          if (minutesAsNumber >= 0 && minutesAsNumber < smallestMinutes) {
            smallestMinutes = minutesAsNumber;
            closestPrayerName = prayerName;
          }
        });
  
        if (smallestMinutes !== Infinity) {
          setClosestPrayer({ name: closestPrayerName, minutes: smallestMinutes });
        }
      }
    }, [nextPrayerMinutes]);


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
            <h1 className="current_time">{currentTimeHere}</h1>
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
            {Object.entries(timings).map(([prayerName, time]) => (
              <div
                key={prayerName}
                className="prayer_time_container"
              >
                <PrayerTimeContainer
                  prayerName={prayerName}
                  prayerTime={convertTo12HourFormat(time)}
                  setNextPrayerMinutes={setNextPrayerMinutes}
                  currentTime={currentTime}
                  iqamaData={iqamaData}
                />
              </div>
            ))}
          </div>
          <h2 className="next_prayer_minutes">
            Next Salah:{" "}
            <span className="next_prayer_span">{closestPrayer?.name + ` (${toArabic(closestPrayer?.name || '')})`}</span> in{" "}
            <span className="next_prayer_span">{closestPrayer?.minutes}</span> minutes
          </h2>
        </div>
      ) : (
        <p>Loading prayer times...</p>
      )}
    </div>
  );
};

export default Dashboard;
