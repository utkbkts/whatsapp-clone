import moment from "moment";

// Tarih bilgisini işleyen bir fonksiyon
export const dateHandler = (date: any) => {
  // Şu anki zamanı al
  let now = moment();
  // Verilen tarihi moment nesnesine dönüştür
  let momentDate = moment(date);
  // Verilen tarihi saat ve dakika formatında al ("HH:mm")
  let dateByHourAndMin = momentDate.format("HH:mm");
  // Verilen tarihin şu ana göre ne kadar önce olduğunu hesapla (örneğin, "3 days", "2 hours")
  let time = momentDate.fromNow(true);

  // Günü belirleyen yardımcı fonksiyon
  const getDay = () => {
    // Geçen gün sayısını al
    let days = time.split(" ")[0];

    // Eğer gün sayısı 8'den küçükse, haftanın gününü döndür
    if (Number(days) < 8) {
      return now.subtract(Number(days), "days").format("dddd");
    } else {
      // 8 gün veya daha fazlaysa, tarihi "GG/AA/YYYY" formatında döndür
      return momentDate.format("DD/MM/YYYY");
    }
  };

  // Eğer tarih "birkaç saniye" öncesiyse "Şimdi" olarak döndür
  if (time === "a few seconds") {
    return "Now";
  }

  // Eğer tarih dakika içeriyorsa, uygun formatta döndür
  if (time.search("minute") !== -1) {
    // Kaç dakika olduğunu al
    let mins = time.split(" ")[0];
    if (mins === "a") {
      // Eğer "a minute" ise, "1 min" olarak döndür
      return "1 min";
    } else {
      // Diğer durumlarda dakikayı "X min" formatında döndür
      return `${mins} min`;
    }
  }

  // Eğer tarih saat içeriyorsa, saati ve dakikayı döndür
  if (time.search("hour") !== -1) {
    return dateByHourAndMin;
  }

  // Eğer tarih "bir gün" öncesiyse, "Dün" olarak döndür
  if (time === "a day") {
    return "Yesterday";
  }

  // Eğer tarih gün içeriyorsa, getDay fonksiyonunu çağır ve sonucu döndür
  if (time.search("days") !== -1) {
    return getDay();
  }

  // Varsayılan olarak, time değişkenini döndür
  return time;
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
