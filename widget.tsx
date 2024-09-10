import React, { useEffect, useState } from "react";
import {
  FlexWidget,
  ImageWidget,
  OverlapWidget,
  SvgWidget,
  TextWidget,
  requestWidgetUpdate,
} from "react-native-android-widget";
import { storage } from "./context/data-context";
import prayTimes from "./PrayTimes";
import { getNext, getNextTime } from "./screens/sala";

let locationPlace = "";
let location = null;
let times = {
  fajr: ["00", "00", "00"],
  shrock: ["00", "00", "00"],
  dohr: ["00", "00", "00"],
  asr: ["00", "00", "00"],
  magrep: ["00", "00", "00"],
  ashaa: ["00", "00", "00"],
};
let timePar = { az: 1 };
storage
  .load({ key: "location" })
  .catch(async () => {
    await storage.save({ key: "location", data: "[23.31667, 58.01667]" });
    let locationPromise = "[23.31667, 58.01667]";
    if (locationPromise) {
      let locationData = JSON.parse(locationPromise);
      location = locationData;
      const prayTimesMs = await prayTimes.getTimes(new Date(), locationData);
      var all = {
        fajr: [
          ((+prayTimesMs.fajr.split(":")[0] + 11) % 12) + 1,
          +prayTimesMs.fajr.split(":")[1],
          +prayTimesMs.fajr.split(":")[0],
        ],
        shrock: [
          (+(+prayTimesMs.sunrise.split(":")[0] + 11) % 12) + 1,
          +prayTimesMs.sunrise.split(":")[1],
          +prayTimesMs.sunrise.split(":")[0],
        ],
        dohr: [
          +(((+prayTimesMs.dhuhr.split(":")[0] + 11) % 12) + 1),
          +prayTimesMs.dhuhr.split(":")[1],
          +prayTimesMs.dhuhr.split(":")[0],
        ],
        asr: [
          +(((+prayTimesMs.asr.split(":")[0] + 11) % 12) + 1),
          +prayTimesMs.asr.split(":")[1],
          +prayTimesMs.asr.split(":")[0],
        ],
        magrep: [
          +(((+prayTimesMs.maghrib.split(":")[0] + 11) % 12) + 1),
          +prayTimesMs.maghrib.split(":")[1],
          +prayTimesMs.maghrib.split(":")[0],
        ],
        ashaa: [
          +(((+prayTimesMs.isha.split(":")[0] + 11) % 12) + 1),
          +prayTimesMs.isha.split(":")[1],
          +prayTimesMs.isha.split(":")[0],
        ],
      };
      times = {
        fajr: [
          (((+prayTimesMs.fajr.split(":")[0] + 11) % 12) + 1).toString(),
          +prayTimesMs.fajr.split(":")[1],
          +prayTimesMs.fajr.split(":")[0],
        ],
        shrock: [
          ((+(+prayTimesMs.sunrise.split(":")[0] + 11) % 12) + 1).toString(),
          +prayTimesMs.sunrise.split(":")[1].toString(),
          +prayTimesMs.sunrise.split(":")[0].toString(),
        ],
        dohr: [
          +(((+prayTimesMs.dhuhr.split(":")[0] + 11) % 12) + 1).toString(),
          +prayTimesMs.dhuhr.split(":")[1].toString(),
          +prayTimesMs.dhuhr.split(":")[0].toString(),
        ],
        asr: [
          +(((+prayTimesMs.asr.split(":")[0] + 11) % 12) + 1).toString(),
          +prayTimesMs.asr.split(":")[1].toString(),
          +prayTimesMs.asr.split(":")[0].toString(),
        ],
        magrep: [
          +(((+prayTimesMs.maghrib.split(":")[0] + 11) % 12) + 1).toString(),
          +prayTimesMs.maghrib.split(":")[1].toString(),
          +prayTimesMs.maghrib.split(":")[0].toString(),
        ],
        ashaa: [
          +(((+prayTimesMs.isha.split(":")[0] + 11) % 12) + 1).toString(),
          +prayTimesMs.isha.split(":")[1].toString(),
          +prayTimesMs.isha.split(":")[0].toString(),
        ],
      } as any;
      if (all) {
        if (getNext(all) == "الفجر") {
          timePar = { az: 1 };
        }
        if (getNext(all) == "الظهر") {
          timePar = { az: 2 };
        }
        if (getNext(all) == "العصر") {
          timePar = { az: 3 };
        }
        if (getNext(all) == "المغرب") {
          timePar = { az: 4 };
        }
        if (getNext(all) == "العشاء") {
          timePar = { az: 5 };
        }
      }
    }
    return null;
  })
  .then(async (locationPromise) => {
    if (locationPromise) {
      let locationData = JSON.parse(locationPromise);
      location = locationData;
      const prayTimesMs = await prayTimes.getTimes(new Date(), locationData);
      var all = {
        fajr: [
          ((+prayTimesMs.fajr.split(":")[0] + 11) % 12) + 1,
          +prayTimesMs.fajr.split(":")[1],
          +prayTimesMs.fajr.split(":")[0],
        ],
        shrock: [
          (+(+prayTimesMs.sunrise.split(":")[0] + 11) % 12) + 1,
          +prayTimesMs.sunrise.split(":")[1],
          +prayTimesMs.sunrise.split(":")[0],
        ],
        dohr: [
          +(((+prayTimesMs.dhuhr.split(":")[0] + 11) % 12) + 1),
          +prayTimesMs.dhuhr.split(":")[1],
          +prayTimesMs.dhuhr.split(":")[0],
        ],
        asr: [
          +(((+prayTimesMs.asr.split(":")[0] + 11) % 12) + 1),
          +prayTimesMs.asr.split(":")[1],
          +prayTimesMs.asr.split(":")[0],
        ],
        magrep: [
          +(((+prayTimesMs.maghrib.split(":")[0] + 11) % 12) + 1),
          +prayTimesMs.maghrib.split(":")[1],
          +prayTimesMs.maghrib.split(":")[0],
        ],
        ashaa: [
          +(((+prayTimesMs.isha.split(":")[0] + 11) % 12) + 1),
          +prayTimesMs.isha.split(":")[1],
          +prayTimesMs.isha.split(":")[0],
        ],
      };
      times = {
        fajr: [
          (((+prayTimesMs.fajr.split(":")[0] + 11) % 12) + 1).toString(),
          +prayTimesMs.fajr.split(":")[1],
          +prayTimesMs.fajr.split(":")[0],
        ],
        shrock: [
          ((+(+prayTimesMs.sunrise.split(":")[0] + 11) % 12) + 1).toString(),
          +prayTimesMs.sunrise.split(":")[1].toString(),
          +prayTimesMs.sunrise.split(":")[0].toString(),
        ],
        dohr: [
          +(((+prayTimesMs.dhuhr.split(":")[0] + 11) % 12) + 1).toString(),
          +prayTimesMs.dhuhr.split(":")[1].toString(),
          +prayTimesMs.dhuhr.split(":")[0].toString(),
        ],
        asr: [
          +(((+prayTimesMs.asr.split(":")[0] + 11) % 12) + 1).toString(),
          +prayTimesMs.asr.split(":")[1].toString(),
          +prayTimesMs.asr.split(":")[0].toString(),
        ],
        magrep: [
          +(((+prayTimesMs.maghrib.split(":")[0] + 11) % 12) + 1).toString(),
          +prayTimesMs.maghrib.split(":")[1].toString(),
          +prayTimesMs.maghrib.split(":")[0].toString(),
        ],
        ashaa: [
          +(((+prayTimesMs.isha.split(":")[0] + 11) % 12) + 1).toString(),
          +prayTimesMs.isha.split(":")[1].toString(),
          +prayTimesMs.isha.split(":")[0].toString(),
        ],
      } as any;
      if (all) {
        if (getNext(all) == "الفجر") {
          timePar = { az: 1 };
        }
        if (getNext(all) == "الظهر") {
          timePar = { az: 2 };
        }
        if (getNext(all) == "العصر") {
          timePar = { az: 3 };
        }
        if (getNext(all) == "المغرب") {
          timePar = { az: 4 };
        }
        if (getNext(all) == "العشاء") {
          timePar = { az: 5 };
        }
      }
    }
  });
export function JoharatAlMoslim({
  next = times ? getNext(times) : "",
  num = times ? getNextTime(times) : "",
}) {
  return (
    <FlexWidget
      clickAction="RERENDER_WIDGET_TIMES"
      clickActionData={{ times: times }}
      style={{
        width: "match_parent",
        height: "match_parent",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlexWidget
        clickAction="RERENDER_WIDGET_TIMES"
        clickActionData={{ times: times }}
        style={{
          width: "match_parent",
          height: 150,
          borderRadius: 5,
          backgroundColor: "#06374C",
          justifyContent:'center'
        }}
      >
        <FlexWidget
          clickAction="RERENDER_WIDGET_TIMES"
          clickActionData={{ times: times }}
          style={{
            width: "match_parent",
            height: "wrap_content",
            alignItems: "center",
            marginBottom: 10,
            backgroundColor: "#017de9",
            justifyContent:'center'

          }}
        >
          <TextWidget
            clickAction="RERENDER_WIDGET_TIMES"
            clickActionData={{ times: times }}
            text={"الصلاة القادمة : " + (next ? next : "")}
            style={{
              fontSize: 18,
              fontFamily: "font2",
              color: "#ffffff",
              marginLeft: 1,
              width: "match_parent",
              textAlign: "center",
            }}
          />
          <TextWidget
            clickAction="RERENDER_WIDGET_TIMES"
            clickActionData={{ times: times }}
            text={"متبقي " + (num ? num : "")}
            style={{
              fontSize: 18,
              fontFamily: "font2",
              color: "#ffffff",
              marginLeft: 1,
              width: "match_parent",
              textAlign: "center",
            }}
          />
          <TextWidget
            clickAction="RERENDER_WIDGET_TIMES"
            clickActionData={{ times: times }}
            text={"انقر لإعادة التحميل"}
            style={{
              fontSize: 14,
              fontFamily: "font2",
              color: "#ffffff",
              marginLeft: 1,
              width: "match_parent",
              textAlign: "center",
            }}
          />
        </FlexWidget>
        <FlexWidget
          clickAction="RERENDER_WIDGET_TIMES"
          clickActionData={{ times: times }}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "match_parent",
          }}
        >
          <FlexWidget
            clickAction="RERENDER_WIDGET_TIMES"
            clickActionData={{ times: times }}
            style={{ marginLeft: 1 }}
          >
            <TextWidget
              clickAction="RERENDER_WIDGET_TIMES"
              clickActionData={{ times: times }}
              text="العشاء"
              style={{
                fontSize: 18,
                fontFamily: "font2",
                color: "#ffffff",
                marginLeft: 1,
                width: 50,
                textAlign: "center",
                backgroundColor: next == "العشاء" ? "#017de9" : "#ffffff00",
              }}
            />
            <TextWidget
              clickAction="RERENDER_WIDGET_TIMES"
              clickActionData={{ times: times }}
              text={(times as any).ashaa[0] + ":" + (times as any).ashaa[1]}
              style={{
                fontSize: 18,
                fontFamily: "font2",
                color: "#ffffff",
                marginLeft: 1,
                width: 50,
                textAlign: "center",
                backgroundColor: next == "العشاء" ? "#017de9" : "#ffffff00",
              }}
            />
          </FlexWidget>
          <FlexWidget
            clickAction="RERENDER_WIDGET_TIMES"
            clickActionData={{ times: times }}
            style={{ marginLeft: 1 }}
          >
            <TextWidget
              clickAction="RERENDER_WIDGET_TIMES"
              clickActionData={{ times: times }}
              text="المغرب"
              style={{
                fontSize: 18,
                fontFamily: "font2",
                color: "#ffffff",
                marginLeft: 1,
                width: 50,
                textAlign: "center",
                backgroundColor: next == "المغرب" ? "#017de9" : "#ffffff00",
              }}
            />
            <TextWidget
              clickAction="RERENDER_WIDGET_TIMES"
              clickActionData={{ times: times }}
              text={(times as any).magrep[0] + ":" + (times as any).magrep[1]}
              style={{
                fontSize: 18,
                fontFamily: "font2",
                color: "#ffffff",
                marginLeft: 1,
                width: 50,
                textAlign: "center",
                backgroundColor: next == "المغرب" ? "#017de9" : "#ffffff00",
              }}
            />
          </FlexWidget>
          <FlexWidget
            clickAction="RERENDER_WIDGET_TIMES"
            clickActionData={{ times: times }}
            style={{ marginLeft: 1 }}
          >
            <TextWidget
              clickAction="RERENDER_WIDGET_TIMES"
              clickActionData={{ times: times }}
              text="العصر"
              style={{
                fontSize: 18,
                fontFamily: "font2",
                color: "#ffffff",
                marginLeft: 1,
                width: 50,
                textAlign: "center",
                backgroundColor: next == "العصر" ? "#017de9" : "#ffffff00",
              }}
            />
            <TextWidget
              clickAction="RERENDER_WIDGET_TIMES"
              clickActionData={{ times: times }}
              text={(times as any).asr[0] + ":" + (times as any).asr[1]}
              style={{
                fontSize: 18,
                fontFamily: "font2",
                color: "#ffffff",
                marginLeft: 1,
                width: 50,
                textAlign: "center",
                backgroundColor: next == "العصر" ? "#017de9" : "#ffffff00",
              }}
            />
          </FlexWidget>
          <FlexWidget style={{ marginLeft: 1 }}>
            <TextWidget
              clickAction="RERENDER_WIDGET_TIMES"
              clickActionData={{ times: times }}
              text="الظهر"
              style={{
                fontSize: 18,
                fontFamily: "font2",
                color: "#ffffff",
                marginLeft: 1,
                width: 50,
                textAlign: "center",
                backgroundColor: next == "الظهر" ? "#017de9" : "#ffffff00",
              }}
            />
            <TextWidget
              clickAction="RERENDER_WIDGET_TIMES"
              clickActionData={{ times: times }}
              text={(times as any).dohr[0] + ":" + (times as any).dohr[1]}
              style={{
                fontSize: 18,
                fontFamily: "font2",
                color: "#ffffff",
                marginLeft: 1,
                width: 50,
                textAlign: "center",
                backgroundColor: next == "الظهر" ? "#017de9" : "#ffffff00",
              }}
            />
          </FlexWidget>
          <FlexWidget
            clickAction="RERENDER_WIDGET_TIMES"
            clickActionData={{ times: times }}
            style={{ marginLeft: 1 }}
          >
            <TextWidget
              clickAction="RERENDER_WIDGET_TIMES"
              clickActionData={{ times: times }}
              text="الشروق"
              style={{
                fontSize: 18,
                fontFamily: "font2",
                color: "#ffffff",
                marginLeft: 1,
                width: 50,
                textAlign: "center",
                backgroundColor:"#ffffff00",
              }}
            />
            <TextWidget
              clickAction="RERENDER_WIDGET_TIMES"
              clickActionData={{ times: times }}
              text={(times as any).shrock[0] + ":" + (times as any).shrock[1]}
              style={{
                fontSize: 18,
                fontFamily: "font2",
                color: "#ffffff",
                marginLeft: 1,
                width: 50,
                textAlign: "center",
                backgroundColor: "#ffffff00",
              }}
            />
          </FlexWidget>
          <FlexWidget
            clickAction="RERENDER_WIDGET_TIMES"
            clickActionData={{ times: times }}
            style={{ marginLeft: 1 }}
          >
            <TextWidget
              clickAction="RERENDER_WIDGET_TIMES"
              clickActionData={{ times: times }}
              text="الفجر"
              style={{
                fontSize: 18,
                fontFamily: "font2",
                color: "#ffffff",
                marginLeft: 1,
                width: 50,
                textAlign: "center",
                backgroundColor: next == "الفجر" ? "#017de9" : "#ffffff00",
              }}
            />
            <TextWidget
              clickAction="RERENDER_WIDGET_TIMES"
              clickActionData={{ times: times }}
              text={(times as any).fajr[0] + ":" + (times as any).fajr[1]}
              style={{
                fontSize: 18,
                fontFamily: "font2",
                color: "#ffffff",
                marginLeft: 1,
                width: 50,
                textAlign: "center",
                backgroundColor: next == "الفجر" ? "#017de9" : "#ffffff00",
              }}
            />
          </FlexWidget>
        </FlexWidget>
      </FlexWidget>
    </FlexWidget>
  );
}
