import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Avatar, Badge } from "@rneui/themed";
import { images } from "../../constants";

type BadgeStatus = "success" | "error" | "primary" | "warning";

export default function AvatarOnline() {
  const [badgeStatus, setBadgeStatus] = useState<BadgeStatus>("success");
  useEffect(() => {
    const currentTime = new Date().getHours();
    const isBetween10AMand10PM = currentTime >= 10 && currentTime < 22;

    setBadgeStatus(isBetween10AMand10PM ? "success" : "error");
  }, []);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar size={80} rounded source={images.logo} />
        <Badge status={badgeStatus} />
      </View>
    </>
  );
}
