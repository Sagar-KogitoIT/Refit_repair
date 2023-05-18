import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  Dimensions,
  Pressable,
} from "react-native";

const initialCount = 7;
const widt = Dimensions.get("screen").width;
const hgt = Dimensions.get("screen").height;

// console.log("dimensions", widt, hgt);

// console.log(SQUARE_SIZE);

// console.log("amount", amount);

export default function Pattern() {
  const [selectedList, setSelectedList] = useState([]);
  const [gestureSelectionList, setGestureSelectionList] = useState([]);
  const [offset, setOffset] = React.useState([]);
  const [translate, setTranslate] = useState(null);
  const [viewWidth, setViewWidth] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);
  const [squareList, setsquareList] = useState([]);

  const wdtbox = (viewWidth - 8) / initialCount;
  const SQUARE_SIZE = wdtbox;
  const hgtbox = viewHeight / SQUARE_SIZE;
  const amount = initialCount * Math.round(hgtbox);
  // const squareList = [...Array(amount).keys()].map((i) => i + 1);

  useEffect(() => {
    let arr = [];
    for (var i = 0; i <= amount - 1; i++) {
      arr.push({
        index: i,
        isPressed: false,
      });
    }
    setsquareList(arr);
  }, [viewWidth]);

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

  const onSelectItem = (pressedItem) => {
    setSelectedList((prevState) => [...prevState, pressedItem]);
  };

  function removeDuplicateAndMerge(selectedArray, gestureSelectedArray) {
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

  const itemStyle = (item) => {
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

  const onLayout = (event, item) => {
    event.target.measure((_x, _y, width, height, pageX, pageY) => {
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
    });
  };

  const renderBox = ({ item, index }) => {
    //console.log(item);

    return (
      <Pressable
        onLayout={(e) => onLayout(e, item)}
        onPress={() => onSelectItem(item)}
        key={item}
        style={[styles.squareStyle, itemStyle(item)]}
      >
        <Text>{index}</Text>
      </Pressable>
    );
  };

  onTouchEvent = (name, ev, item) => {
    // console.log(item);
    // console.log(
    //   `[${name}] ` +
    //     `root_x: ${ev.nativeEvent.pageX}, root_y: ${ev.nativeEvent.pageY} ` +
    //     `target_x: ${ev.nativeEvent.locationX}, target_y: ${ev.nativeEvent.locationY} ` +
    //     `target: ${ev.nativeEvent.target}`
    // );
  };

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        var { x, y, width, height } = event.nativeEvent.layout;
        setViewHeight(height);
        setViewWidth(width);
      }}
    >
      <View
        style={[styles.listWrapper, { width: viewWidth, height: viewHeight }]}
      >
        {squareList.map((item, index) => {
          return (
            <View
              pointerEvents="auto"
              onStartShouldSetResponder={(ev) => true}
              onResponderGrant={(e) =>
                onTouchEvent("onResponderGrant", e, item)
              }
              onResponderMove={(e) => onTouchEvent("onResponderMove", e, item)}
              key={index}
              style={[
                styles.squareStyle,
                // itemStyle(item),
                { height: SQUARE_SIZE, width: SQUARE_SIZE },
              ]}
            >
              <Text>{index}</Text>
            </View>
          );
        })}
      </View>
    </View>
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
    backgroundColor: "#fff",
  },
  squareStyle: {
    backgroundColor: "orangered",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1,
  },
});
