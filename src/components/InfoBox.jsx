import { useSelector } from "react-redux";
import { ClockCircleTwoTone, CarTwoTone } from "@ant-design/icons";
import { Card } from "antd";
const InfoBox = () => {
  const { geoJSONData } = useSelector((state) => state);
  const distance = geoJSONData
    ? Math.floor(geoJSONData.features[0].properties.summary.distance / 1000)
    : null;
  const duration = geoJSONData
    ? geoJSONData.features[0].properties.summary.duration
    : null;
  return (
    <div style={{ width: "100%" }}>
      {geoJSONData && (
        <Card>
          <span>
            <font size={3}>
              <CarTwoTone size={14} /> {distance} км{" "}
            </font>
          </span>
          <font size={3}>
            <ClockCircleTwoTone size={14} />{" "}
            {new Date(duration * 1000).toUTCString().split(/ /)[4]}{" "}
          </font>
        </Card>
      )}
    </div>
  );
};

export default InfoBox;
