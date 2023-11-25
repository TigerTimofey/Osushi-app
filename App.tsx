import React from "react";
import { SafeAreaView, Text, View } from "react-native";

import CampaignSlider from "./src/screens/homeCampaign/CampaignSlider";
import AvatarOnline from "./src/screens/components/AvatarOnline";

export default function App() {
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <AvatarOnline />

        <CampaignSlider />
      </SafeAreaView>
    </>
  );
}
