import { CalendarOutlined } from "@ant-design/icons";
import { Badge, Card, List, Skeleton as AntdSkeleton } from "antd";
import dayjs from "dayjs";
import { Text } from "@/app/(components)/Text";

const data = {
  data: [
    {
      id: "event1",
      title: "Team Meeting",
      color: "#FF5733", // Example: Orange
      startDate: "2025-01-15T10:00:00Z",
      endDate: "2025-01-15T11:00:00Z",
    },
    {
      id: "event2",
      title: "Project Kickoff",
      color: "#33FF57", // Example: Green
      startDate: "2025-01-16T14:00:00Z",
      endDate: "2025-01-16T16:00:00Z",
    },
    {
      id: "event3",
      title: "Quarterly Review",
      color: "#3357FF", // Example: Blue
      startDate: "2025-01-17T09:00:00Z",
      endDate: "2025-01-17T12:00:00Z",
    },
  ],
};
export const CalendarUpcomingEvents = () => {
  const isLoading = false;

  return (
    <Card
      style={{
        height: "100%",
      }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <CalendarOutlined />
          <Text size="sm" style={{ marginLeft: ".7rem" }}>
            Upcoming events
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, index) => ({
            id: index,
          }))}
          renderItem={() => {
            return (
              <List.Item>
                <List.Item.Meta
                  avatar={<Badge color="transparent" />}
                  title={
                    <AntdSkeleton.Button
                      active
                      style={{
                        height: "14px",
                      }}
                    />
                  }
                  description={
                    <AntdSkeleton.Button
                      active
                      style={{
                        width: "300px",
                        marginTop: "8px",
                        height: "16px",
                      }}
                    />
                  }
                />
              </List.Item>
            );
          }}
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={data?.data || []}
          renderItem={(item) => {
            const renderDate = () => {
              const start = dayjs(item.startDate).format(
                "MMM DD, YYYY - HH:mm"
              );
              const end = dayjs(item.endDate).format("MMM DD, YYYY - HH:mm");

              return `${start} - ${end}`;
            };

            return (
              <List.Item>
                <List.Item.Meta
                  avatar={<Badge color={item.color} />}
                  title={<Text size="xs">{`${renderDate()}`}</Text>}
                  description={
                    <Text ellipsis={{ tooltip: true }} strong>
                      {item.title}
                    </Text>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}

      {!isLoading && data?.data.length === 0 && <NoEvent />}
    </Card>
  );
};

const NoEvent = () => (
  <span
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "220px",
    }}
  >
    No Upcoming Event
  </span>
);
