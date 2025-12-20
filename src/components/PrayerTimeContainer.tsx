import "../styles/PrayerTimeContainer.css";
import { useEffect } from "react";

const PrayerTimeContainer = ({
  prayerName,
  prayerTime,
  setNextPrayerMinutes,
  currentTime,
  iqamaData
}: {
  prayerName: string;
  prayerTime: string;
  setNextPrayerMinutes: (minutes: {}) => void;
  currentTime: Date;
  iqamaData: any;
}) => {

  const toArabic = (prayerName: string) => {
    switch (prayerName) {
      case "Fajr":
        return "الفجر";
      case "Dhuhr":
        return "الظهر";
      case "Asr":
        return "العصر";
      case "Maghrib":
        return "المغرب";
      case "Isha":
        return "العشاء";
      case "Jummah":
        return "جمعة";
    }
  };

  const addMinutes = (time: string) => {
    const [hours, minutes] = time
      .split(":")
      .map((value) => parseInt(value, 10));

    const totalMinutes = minutes + 0;
    const newHours = (hours + Math.floor(totalMinutes / 60)) % 24; // Handle hour overflow
    const newMinutes = totalMinutes % 60; // Remaining minutes after overflow

    return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(
      2,
      "0"
    )}`;
  };

const iqamaTimes = (prayerTime: string, prayerName: string) => {
  if (!iqamaData) return undefined;
  switch (prayerName) {
    case "Fajr":
      if (typeof iqamaData["fajr"] === "number")
        return addMinutes(prayerTime);
      break;
    case "Dhuhr":
      if (typeof iqamaData["dhuhr"] === "number")
        return addMinutes(prayerTime);
      break;
    case "Asr":
      if (typeof iqamaData["asr"] === "number")
        return addMinutes(prayerTime);
      break;
    case "Maghrib":
      if (typeof iqamaData["maghrib"] === "number")
        return addMinutes(prayerTime);
      break;
    case "Isha":
      if (typeof iqamaData["isha"] === "number")
        return addMinutes(prayerTime);
      break;
    case "Jummah":
      return "01:00";
  }
  return undefined;
};

  const timeOfDayIndicator = (prayerName: string) => {
    switch (prayerName) {
      case "Fajr":
        return "AM"; // Fajr is always in the morning
      case "Dhuhr":
      case "Asr":
      case "Maghrib":
      case "Isha":
      case "Jummah":
        return "PM"; // These prayers are in the afternoon/evening
    }
  };

  const getDayOfWeek = (date: Date) => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  };

  const calculateMinutesDifference = (
    time1: string,
    time2: Date,
    prayerName: string
  ) => {
    const [hours, minutes] = time1.split(":").map(Number);
    const isPM = timeOfDayIndicator(prayerName) === "PM";
    const hours24 =
      isPM && hours !== 12 ? hours + 12 : hours === 12 && !isPM ? 0 : hours;

    const totalMinutes1 = hours24 * 60 + minutes;
    const totalMinutes2 = time2.getHours() * 60 + time2.getMinutes();

    if (totalMinutes1 < totalMinutes2) {
      return totalMinutes1 + 1440 - totalMinutes2; // Add 24 hours to iqama time
    }

    return totalMinutes1 - totalMinutes2;
  };

  useEffect(() => {
    const iqamaTime = iqamaTimes(prayerTime, prayerName); // Get iqama time for the current prayer
    const dayOfWeek = getDayOfWeek(currentTime);
console.log(iqamaTime, prayerName)
    if (iqamaTime) {
      if (
        prayerName !== "Jummah" ||
        (dayOfWeek === "Friday" && prayerName === "Jummah")
      ) {
        const minutesDifference = calculateMinutesDifference(
          iqamaTime,
          currentTime,
          prayerName
        );

        setNextPrayerMinutes((prevMinutes: any) => ({
          ...prevMinutes,
          [prayerName]: String(minutesDifference),
        }));
      }
    }
  }, [prayerTime, prayerName, currentTime, setNextPrayerMinutes]);

  return (
    <div className="outer_container">
      <div className="first_section">
        {prayerName.includes("Maghrib") ? (
          <h2 className="prayer_name">MAGHRIB</h2>
        ) : (
          <h2 className="prayer_name">{prayerName.toUpperCase()}</h2>
        )}
        <h2 className="arabic_name">{toArabic(prayerName)}</h2>
        {/* {!prayerName.includes("Jummah") && (
          <h2 className="prayer_time">{prayerTime}</h2>
        )} */}
      </div>
      <div className="second_section">
        {!prayerName.includes("Jummah") ? (
          <h2 className="iqama_time_jummah">
            {iqamaTimes(prayerTime, prayerName)}
          </h2>
        ) : (
          <h2 className="iqama_time">01:00</h2>
        )}
        <h2 className="time_of_day_indicator">
          {timeOfDayIndicator(prayerName)}
        </h2>
      </div>
    </div>
  );
};

export default PrayerTimeContainer;
