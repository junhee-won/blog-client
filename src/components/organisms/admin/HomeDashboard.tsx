import { useState, useEffect } from "react";
import apiHelper from "../../../modules/apiHelper";
import VisitorCountsContainer from "../../molecules/VisitorCountsContainer";
import { VisitorCount } from "../../../types/interfaces";

export default function HomeDashboard() {
  const [visitorCounts, setVisitorCoutns] = useState<VisitorCount[]>([]);

  useEffect(() => {
    const getVisitorCounts = async () => {
      const res = await apiHelper({
        url: process.env.NEXT_PUBLIC_API_VIEW_LAST_DAYS,
        method: "GET",
        jwt: true,
      });
      if (res.success) {
        setVisitorCoutns(res.data);
      } else {
        alert("error");
      }
    };
    getVisitorCounts();
  }, []);

  return (
    <VisitorCountsContainer>
      {visitorCounts.map((item, index) => {
        return <VisitorCountsContainer.item visitorCount={item} key={index} />;
      })}
    </VisitorCountsContainer>
  );
}
