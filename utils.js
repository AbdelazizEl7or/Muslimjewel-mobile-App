import { useTranslation } from "react-i18next";
import { themeType } from "./context/data-context";
import { Alert } from "react-native";

function gmod(n, m) {
  return ((n % m) + m) % m;
}
export function toHHMMSS(secs) {
  const sec_num = parseInt(secs, 10);
  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor(sec_num / 60) % 60;
  const seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
}
export function kuwaiticalendar(date) {
  var today = new Date();
  if (date) {
    today = date;
  }
  today.setDate(today.getDate() - 2);
  day = today.getDate();
  month = today.getMonth();
  year = today.getFullYear();
  m = month + 1;
  y = year;
  if (m < 3) {
    y -= 1;
    m += 12;
  }

  a = Math.floor(y / 100);
  b = 2 - a + Math.floor(a / 4);
  if (y < 1583) b = 0;
  if (y == 1582) {
    if (m > 10) b = -10;
    if (m == 10) {
      b = 0;
      if (day > 4) b = -10;
    }
  }

  jd =
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    day +
    b -
    1524;

  b = 0;
  if (jd > 2299160) {
    a = Math.floor((jd - 1867216.25) / 36524.25);
    b = 1 + a - Math.floor(a / 4);
  }
  bb = jd + b + 1524;
  cc = Math.floor((bb - 122.1) / 365.25);
  dd = Math.floor(365.25 * cc);
  ee = Math.floor((bb - dd) / 30.6001);
  day = bb - dd - Math.floor(30.6001 * ee);
  month = ee - 1;
  if (ee > 13) {
    cc += 1;
    month = ee - 13;
  }
  year = cc - 4716;

  wd = gmod(jd + 1, 7) + 1;

  iyear = 10631 / 30;
  epochastro = 1948084;
  epochcivil = 1948085;

  shift1 = 8.01 / 60;

  z = jd - epochastro;
  cyc = Math.floor(z / 10631);
  z = z - 10631 * cyc;
  j = Math.floor((z - shift1) / iyear);
  iy = 30 * cyc + j;
  z = z - Math.floor(j * iyear + shift1);
  im = Math.floor((z + 28.5001) / 29.5);
  if (im == 13) im = 12;
  id = z - Math.floor(29.5001 * im - 29);

  var myRes = new Array(8);

  myRes[0] = day; //calculated day (CE)
  myRes[1] = month - 1; //calculated month (CE)
  myRes[2] = year; //calculated year (CE)
  myRes[3] = jd - 1; //julian day number
  myRes[4] = wd - 1; //weekday number
  myRes[5] = id; //islamic date
  myRes[6] = im - 1; //islamic month
  myRes[7] = iy; //islamic year

  return myRes;
}
export function writeIslamicDate(date, wdNamesInCorr, islamicMoth) {
  // var wdNames = new Array("الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت");
  var wdNames = wdNamesInCorr;
  var iMonthNames = islamicMoth;
  var iDate = kuwaiticalendar(date);
  var outputIslamicDate =
    wdNames[iDate[4]] +
    ", " +
    iDate[5] +
    " " +
    iMonthNames[iDate[6]] +
    " " +
    iDate[7];
  return outputIslamicDate;
}
export function writeDate(wdNamesCorr, noislamicMonth) {
  var wdNames = wdNamesCorr;
  var iMonthNames = noislamicMonth;
  var iDate = new Date();
  const currentDayOfWeek = wdNames[iDate.getDay()];

  var outputIslamicDate =
    currentDayOfWeek +
    ", " +
    iDate.getDate() +
    " " +
    iMonthNames[iDate.getMonth()] +
    " " +
    iDate.getFullYear();
  return outputIslamicDate;
}
export function formatArabicMint(num) {
  if (num == 1) return "دقيقة واحدة";
  if (num == 2) return "دقيقتان";
  if (num >= 3 && num < 11) return num + " دقائق";
  return num + " دقيقة";
}

export function formatArabicHours(num) {
  if (num == 1) return "ساعة واحدة";
  if (num == 2) return "ساعتان";
  if (num >= 3 && num < 11) return num + " ساعات";
  return num + " ساعة";
}

export const translateWithLang = async (text, lang) => {
  text = text || "Hi";
  const apikey = "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";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + apikey,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You will be provided with a Address in English, and your task is to translate it into Arabic Address.",
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0.7,
      max_tokens: 640,
      top_p: 1,
    }),
  });
  const json = await response.json();
  return json.choices[0].message.content
    .replaceAll("مبلع", "معبيلة")
    .replaceAll("مبله", "معبيلة")
    .replaceAll("مابله", "معبيلة")
    .replaceAll("مابيله", "معبيلة")
    .replaceAll("مابيلة", "معبيلة");
};
export const getAutoComplete = async (text) => {
  const response = await fetch(
    "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=عمان&key=AIzaSyDMcPwU1GeuhEMIgTHbvEwKN2op0nC7Ya4",
    {
      method: "GET",
    }
  );
  const json = await response.json();
  Alert.alert(JSON.stringify(json));
  return json;
};

export function serial(text) {
  text = text.replace(
    /([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g,
    ""
  );
  //normalize Arabic
  text = text.replace(/(آ|إ|أ)/g, "ا");
  text = text.replace(/(ة)/g, "ه");
  text = text.replace(/(ئ|ؤ)/g, "ء");
  text = text.replace(/(ى)/g, "ي");
  //convert arabic numerals to english counterparts.
  var starter = 0x660;
  for (var i = 0; i < 10; i++) {
    text.replace(String.fromCharCode(starter + i), String.fromCharCode(48 + i));
  }
  return text;
}
