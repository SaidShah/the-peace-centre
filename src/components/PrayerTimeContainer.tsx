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
    // Split the time into hours and minutes, and parse them as numbers
    const [hours, minutes] = time.split(":").map((value) => parseInt(value, 10));
  
    // Add minutes and calculate overflow
    const totalMinutes = minutes + minutesToAdd;
    const newHours = (hours + Math.floor(totalMinutes / 60)) % 24; // Handle hour overflow
    const newMinutes = totalMinutes % 60; // Remaining minutes after overflow
  
    // Format the new time as HH:mm
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
      <div>
        { !prayerName.includes("Jummah") ?
          <h2 className="iqama_time">{iqamaTimes(prayerTime, prayerName)}</h2>
          :
          <h2 className="iqama_time">01:00</h2>}
      </div>
    </div>
  )
}

export default PrayerTimeContainer;