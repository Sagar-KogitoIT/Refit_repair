import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
  PanResponderGestureState,
  SafeAreaView,
  LayoutChangeEvent,
  Dimensions,
} from "react-native";

const initialCount = 7;
const widt = Dimensions.get("window").width;
const hgt = Dimensions.get("window").height;

console.log("dimensions", widt, hgt);

const wdtbox = (widt - 8) / initialCount;
const SQUARE_SIZE = wdtbox;
console.log(SQUARE_SIZE);

const hgtbox = hgt / SQUARE_SIZE;
console.log("height", hgtbox);

const amount = initialCount * Math.round(hgtbox);
console.log("amount", amount);

const squareList = [...Array(amount).keys()].map((i) => i + 1);

type OffsetType = {
  id: number;
  x: number;
  y: number;
  height: number;
  width: number;
};

export default function Pattern(): JSX.Element {
  const [selectedList, setSelectedList] = useState<number[]>([]);
  const [gestureSelectionList, setGestureSelectionList] = useState<number[]>(
    []
  );
  const [offset, setOffset] = React.useState<OffsetType[]>([]);
  const [translate, setTranslate] = useState<PanResponderGestureState | null>(
    null
  );

  useEffect(() => {
    if (translate !== null) {
      const { moveX, moveY } = translate;
      offset.map((offsetItem) => {
        if (
          offsetItem.x < moveX &&
          moveX < offsetItem.x + SQUARE_SIZE &&
          offsetItem.y < moveY &&
          moveY < offsetItem.y + SQUARE_SIZE
        ) {
          setGestureSelectionList((prevState) => [...prevState, offsetItem.id]);
        }
      });
    }
  }, [translate]);

  const onSelectItem = (pressedItem: number) => {
    setSelectedList((prevState) => [...prevState, pressedItem]);
  };

  function removeDuplicateAndMerge(
    selectedArray: number[],
    gestureSelectedArray: number[]
  ): number[] {
    const newArray = [...selectedArray, ...gestureSelectedArray];
    const mergedArray = [...new Set(newArray)];
    return mergedArray;
  }

  useEffect(() => {
    if (!translate) {
      setSelectedList(
        removeDuplicateAndMerge(selectedList, gestureSelectionList)
      );
      setGestureSelectionList([]);
    }
  }, [translate]);

  const panResponder = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: (_evt) => true,
      onPanResponderMove: (_evt, gesture) => {
        setTranslate({ ...gesture });
      },
      onPanResponderRelease: () => {
        setTranslate(null);
      },
      onShouldBlockNativeResponder: () => true,
    })
  )[0];

  const itemStyle = (item: number) => {
    const gestureBGColor = gestureSelectionList.find(
      (selectedItem) => selectedItem === item
    )
      ? true
      : false;
    const selectedBGColor = selectedList.find(
      (selectedItem) => selectedItem === item
    )
      ? true
      : false;
    return {
      backgroundColor: gestureBGColor
        ? "gray"
        : selectedBGColor
        ? "blue"
        : "orangered",
    };
  };

  const onLayout = (event: LayoutChangeEvent | any, item: any) => {
    event.target.measure(
      (
        _x: number,
        _y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number
      ) => {
        setOffset((prevOffset) => [
          ...prevOffset,
          {
            id: item,
            x: pageX,
            y: pageY,
            width,
            height,
          },
        ]);
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listWrapper} {...panResponder.panHandlers}>
        {squareList.map((item, index) => {
          return (
            <TouchableOpacity
              onLayout={(e) => onLayout(e, item)}
              onPress={() => onSelectItem(item)}
              key={index}
              style={[styles.squareStyle, itemStyle(item)]}
            >
              {/* <Text>{item}</Text> */}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "space-between",
    // backgroundColor: '#fff',
  },
  squareStyle: {
    backgroundColor: "orangered",
    height: SQUARE_SIZE,
    width: SQUARE_SIZE,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1,
  },
});
