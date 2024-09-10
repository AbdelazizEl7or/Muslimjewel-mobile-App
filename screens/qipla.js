import React, { useState, useEffect, useContext } from "react";
import { Image, View, Text, Dimensions } from "react-native";
import { Grid, Col, Row } from "react-native-easy-grid";
import { Magnetometer } from "expo-sensors";
import { DataContext } from "../context/data-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";

const { height, width } = Dimensions.get("window");

export default function Qipla() {
  const DataCtx = useContext(DataContext);

  const [subscription, setSubscription] = useState(null);
  const [magnetometer, setMagnetometer] = useState(0);
  const [direction, setDirection] = useState({ deg: 0, compass: "" });

  async function getQiblaDirection() {
    let locationPromise = await DataCtx.getLocation();
    let locationData = JSON.parse(locationPromise || "[23.31667, 58.01667]");

    // Get user's current location
    var latitude = locationData[0];
    var longitude = locationData[1];

    // Calculate qibla direction
    var phiK = (21.4 * Math.PI) / 180.0;
    var lambdaK = (39.8 * Math.PI) / 180.0;
    var phi = (latitude * Math.PI) / 180.0;
    var lambda = (longitude * Math.PI) / 180.0;
    var y = Math.sin(lambdaK - lambda);
    var x =
      Math.cos(phi) * Math.tan(phiK) -
      Math.sin(phi) * Math.cos(lambdaK - lambda);
    var qibla = (Math.atan2(y, x) * 180.0) / Math.PI;

    // Convert qibla direction from degrees to compass direction
    if (qibla < 0) {
      qibla += 360;
    }
    var compass;
    if (qibla >= 337.5 || qibla < 22.5) {
      compass = "شمال";
    } else if (qibla >= 22.5 && qibla < 67.5) {
      compass = "شمال شرق ";
    } else if (qibla >= 67.5 && qibla < 112.5) {
      compass = "شرق";
    } else if (qibla >= 112.5 && qibla < 157.5) {
      compass = "جنوب شرق";
    } else if (qibla >= 157.5 && qibla < 202.5) {
      compass = "جنوب";
    } else if (qibla >= 202.5 && qibla < 247.5) {
      compass = "جنوب غرب";
    } else if (qibla >= 247.5 && qibla < 292.5) {
      compass = "الغرب";
    } else if (qibla >= 292.5 && qibla < 337.5) {
      compass = "شمال غرب";
    }
    return { deg: qibla, compass: compass };
  }

  useEffect(() => {
    _toggle();
    return () => {
      _unsubscribe();
    };
  }, []);
  useState(async () => {
    var dir = await getQiblaDirection();
    setDirection(dir);
  });

  const _toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((data) => {
        setMagnetometer(_angle(data));
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const _angle = (magnetometer) => {
    let angle = 0;
    if (magnetometer) {
      let { x, y, z } = magnetometer;
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return Math.round(angle);
  };

  const _direction = (degree) => {
    if (degree >= 22.5 && degree < 67.5) {
      return "شمال شرق";
    } else if (degree >= 67.5 && degree < 112.5) {
      return "الشرق";
    } else if (degree >= 112.5 && degree < 157.5) {
      return "جنوب شرق";
    } else if (degree >= 157.5 && degree < 202.5) {
      return "جنوب";
    } else if (degree >= 202.5 && degree < 247.5) {
      return "جنوب غرب";
    } else if (degree >= 247.5 && degree < 292.5) {
      return "الغرب";
    } else if (degree >= 292.5 && degree < 337.5) {
      return "شمال غرب";
    } else {
      return "شمال";
    }
  };

  // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
  const _degree = (magnetometer) => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  return (
    <Grid style={{ backgroundColor: "#001009", flex: 1 }}>
      <Row style={{ alignItems: "center" }} size={0.9}>
        <Col style={{ alignItems: "center" }}>
          <Text
            style={{
              color: "#fff",
              fontSize: height / 26,
              fontFamily: "font2",
            }}
          >
            <View>
              <Image
                source={require("../assets/kabah.png")}
                style={{
                  width: 70,
                  height: 70,
                  opacity:
                    _degree(magnetometer) == direction.deg ||
                    (_degree(magnetometer) > direction.deg &&
                      _degree(magnetometer) < direction.deg + 10) ||
                    (_degree(magnetometer) < direction.deg &&
                      _degree(magnetometer) > direction.deg - 10)
                      ? 1
                      : 0.5,
                }}
              ></Image>
            </View>
          </Text>
        </Col>
      </Row>

      <Row style={{ alignItems: "center" }} size={2}>
        <Text
          style={{
            color: "#fff",
            fontSize: height / 27,
            width: width,
            position: "absolute",
            textAlign: "center",
            fontFamily: "font2",
          }}
        >
          {_degree(magnetometer)}°
        </Text>
        <Col
          style={{
            alignItems: "center",
            transform: [{ rotate: 360 - magnetometer + "deg" }],
          }}
        >
          <Image
            source={require("../assets/compass_bg.png")}
            style={{
              height: width - 80,
              justifyContent: "center",
              alignItems: "center",
              resizeMode: "contain",
            }}
          />
          <View
            style={{
              position: "absolute",
              height: width - 80,
              alignItems: "center",
              backgroundColor: "red",
              transform: [{ rotate: 90 + direction.deg + "deg" }],
            }}
          >
            <Image
              source={require("../assets/compass_pointer.png")}
              style={{
                height: height / 26,
                resizeMode: "contain",
                position: "absolute",
                top: -30,
              }}
            />
          </View>
        </Col>
      </Row>

      <Row style={{ alignItems: "center" }} size={1}>
        <Col style={{ alignItems: "center" }}>
          <Text
            style={{
              color: "#fff",
              fontFamily: "font2",
              fontSize: 24,
            }}
          >
            الإتجاه التقريبي للقبلة {direction.deg.toFixed(0)}°{" "}
            {direction.compass}
          </Text>
          <Text
            style={{
              color: "#9a0000",
              fontFamily: "font2",
              fontSize: 20,
            }}
          >
            ملاحظة قد تحتاج لتحريك الهاتف في شكل دائري لإعادة ضبط بوصلة الهاتف.
          </Text>
        </Col>
      </Row>
    </Grid>
  );
}
