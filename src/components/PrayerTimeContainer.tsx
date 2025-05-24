import "../styles/PrayerTimeContainer.css";

const PrayerTimeContainer = ({prayerName, prayerTime}: {prayerName: string, prayerTime: string}) => {

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

  const addMinutes = (time: string, minutesToAdd: number) => {

    const [hours, minutes] = time.split(":").map((value) => parseInt(value, 10));
  
    const totalMinutes = minutes + minutesToAdd;
    const newHours = (hours + Math.floor(totalMinutes / 60)) % 24; // Handle hour overflow
    const newMinutes = totalMinutes % 60; // Remaining minutes after overflow
  
    return `${String(newHours).padStart(2, "0")}:${String(newMinutes).padStart(2, "0")}`;
  };

  const iqamaTimes = (prayerTime: string, prayerName: string) => {
    switch (prayerName) {
      case 'Fajr':
        return addMinutes(prayerTime, 25);
      case 'Dhuhr':
        return addMinutes(prayerTime, 25);
      case 'Asr':
        return addMinutes(prayerTime, 25);
      case 'Maghrib':
        return addMinutes(prayerTime, 10);
      case 'Isha':
        return addMinutes(prayerTime, 10);
    }
  }

  const timeOfDayIndicator = (prayerName: string) => {
    switch (prayerName) {
      case 'Fajr':
        return "AM";
      case 'Dhuhr':
        return "PM";
      case 'Asr':
        return "PM";
      case 'Maghrib':
        return "PM";
      case 'Isha':
        return "PM";
      case 'Jummah':
        return "PM";
    }
  }

  return (
    <div className="outer_container">
      <div className="first_section">
        { prayerName.includes("Maghrib") ?
          <h2 className="prayer_name">MAGH</h2>
          :
          <h2 className="prayer_name">{prayerName.toUpperCase()}</h2>
          }
        <h2 className="arabic_name">{toArabic(prayerName)}</h2>
        {!prayerName.includes("Jummah") && <h2 className="prayer_time">{prayerTime}</h2>}
      </div>
      <div className="second_section">
        { !prayerName.includes("Jummah") ?
          <h2 className="iqama_time_jummah">{iqamaTimes(prayerTime, prayerName)}</h2>
          :
          <h2 className="iqama_time">01:00</h2>
        }
          <h2 className="time_of_day_indicator">{timeOfDayIndicator(prayerName)}</h2>
      </div>
    </div>
  )
}

export default PrayerTimeContainer;