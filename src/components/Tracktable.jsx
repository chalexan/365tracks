import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select, Table } from "antd";

const Tracktable = () => {
  const { Option } = Select;
  const dispath = useDispatch();
  const [activeRow, setActiveRow] = useState(0);
  useEffect(() => dispath({ type: "LOAD_ORDERS" }), []);

  const { orders } = useSelector((state) => state);
  const { adresses } = useSelector((state) => state);
  const { updString } = useSelector((state) => state);
  const columns = [
    {
      title: "# заказа",
      dataIndex: "trackNum",
      key: "trackNum",
    },
    {
      title: "Название",
      dataIndex: "trackName",
      key: "trackName",
    },
    {
      title: "Откуда",
      key: "fromAddr",
      render: (_, record) => (
        <>
          <Select
            defaultValue={record.fromAddr}
            style={{ width: 150 }}
            onChange={(el) =>
              dispath({ type: "UPD", payload: record.key + el + activeRow })
            }
          >
            {adresses &&
              adresses.map((el) => (
                <Option key={`f${el.key}`} style={{ width: "100%" }}>
                  {el.name}
                </Option>
              ))}
          </Select>
        </>
      ),
    },
    {
      title: "Куда",
      dataIndex: "toAddr",
      key: "toAddr",
      render: (_, record) => (
        <>
          <Select
            defaultValue={record.toAddr}
            style={{ width: 150 }}
            onChange={(el) => {
              return dispath({
                type: "UPD",
                payload: record.key + el + activeRow,
              });
            }}
          >
            {adresses &&
              adresses.map((el) => (
                <Option key={`t${el.key}`} style={{ width: "100%" }}>
                  {el.name}
                </Option>
              ))}
          </Select>
        </>
      ),
    },
  ];

  return (
    <Table
      style={{ margin: "10px", border: "dashed" }}
      bordered={false}
      scroll={{ x: true }}
      dataSource={orders}
      columns={columns}
      pagination={false}
      rowSelection={{ type: "radio" }}
      onRow={(record, _) => {
        return {
          onChange: () => {
            setActiveRow(_);
            dispath({
              type: "SET_COORDINATES",
              payload: [record.fromCoords, record.toCoords],
            });
          },
        };
      }}
    />
  );
};

export default Tracktable;
