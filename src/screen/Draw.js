import React, { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { Canvas, Path } from "@shopify/react-native-skia";

export default function Draw() {
  const [paths, setPaths] = useState([]);

  const pan = Gesture.Pan()
    .onStart((g) => {
      const newPaths = [...paths];
      newPaths[paths.length] = {
        segments: [],
        color: "#0071C1",
      };
      newPaths[paths.length].segments.push(`M ${g.x} ${g.y}`);
      runOnJS(setPaths)(newPaths);
    })
    .onUpdate((g) => {
      const index = paths.length - 1;
      const newPaths = [...paths];
      if (newPaths?.[index]?.segments) {
        // newPaths[index].segments.push(`L ${g.x} ${g.y}`);

        newPaths[index] = {
          ...newPaths[index],
          segments: [...newPaths[index]?.segments, `L ${g.x} ${g.y}`],
        };

        console.log("updated Path", newPaths);

        runOnJS(setPaths)(newPaths);
      }
    })
    .minDistance(1);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pan}>
        <View style={{ flex: 1, backgroundColor: "black" }}>
          <Canvas style={{ flex: 8 }}>
            {paths.map((p, index) => (
              <Path
                key={index}
                path={p.segments.join(" ")}
                strokeWidth={24}
                style="stroke"
                color={p.color}
              />
            ))}
          </Canvas>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
