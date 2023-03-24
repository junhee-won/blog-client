import styled from "styled-components";
import { useState, useEffect } from "react";
import apiHelper from "../../modules/apiHelper";

interface Props {}

interface DayView {
  localeDateString: string;
  count: number;
}

export default function Home({}: Props) {
  const [lastDaysViews, setLastDaysViews] = useState<DayView[]>([]);

  useEffect(() => {
    const getResent7Days = async () => {
      const res = await apiHelper({
        url: process.env.NEXT_PUBLIC_API_VIEW_LAST_DAYS,
        method: "GET",
        jwt: true,
      });
      if (res.success) {
        setLastDaysViews(res.data);
      } else {
        alert("error");
      }
    };
    getResent7Days();
  }, []);

  return (
    <Container>
      {lastDaysViews.map((dayView, index) => {
        return (
          <ViewBox key={index}>
            <Box>{dayView.count}</Box>
            <Box>{dayView.localeDateString}</Box>
          </ViewBox>
        );
      })}
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ViewBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 3px;
`;

const Box = styled.div`
  height: 80px;
  width: 100px;
  line-height: 80px;
  text-align: center;
`;
