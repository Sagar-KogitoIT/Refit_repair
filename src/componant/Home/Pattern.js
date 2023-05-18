import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
// const n = 10;
// const gridSize = 10; // number of rows and columns
// const cellSize = 30; // size of each cell in pixels
// const n = 10; // number of rows and columns
// const cellSize = 40; // size of each cell
// const containerSize = cellSize * n; // size of the container
const Pattern = ({ n }) => {
  const renderCells = () => {
    const cells = [];
    for (let i = 0; i < n; i++) {
      const row = [];
      for (let j = 0; j < n; j++) {
        let cellStyle = styles.cell;
        if (
          i === 0 ||
          i === n - 1 ||
          j === 0 ||
          j === n - 1 ||
          j === i ||
          j === n - i - 1
        ) {
          cellStyle = styles.cellHighlighted;
        }
        row.push(
          <TouchableOpacity
            disabled={cellStyle == styles.cell ? true : false}
            key={`${i}_${j}`}
            style={cellStyle}
            onPress={() => onChangeCell(`${i}_${j}`, cellStyle)}
          ></TouchableOpacity>
        );
      }
      cells.push(
        <View key={i} style={styles.row}>
          {row}
        </View>
      );
    }
    return cells;
  };
  const onChangeCell = (key, cellStyle) => {
    
  };
  //   const renderCell = (row, col) => {
  //     // check if the current cell is a star cell
  //     const isStarCell =
  //       row === 0 ||
  //       row === gridSize - 1 ||
  //       col === 0 ||
  //       col === gridSize - 1 ||
  //       row === col ||
  //       col === gridSize - 1 - row;

  //     return (
  //       <View
  //         key={`${row},${col}`}
  //         style={[styles.cell, isStarCell && styles.starCell]}
  //       />
  //     );
  //   };

  //   const renderRow = (row) => {
  //     return (
  //       <View key={row} style={styles.row}>
  //         {Array.from({ length: gridSize }, (_, col) => renderCell(row, col))}
  //       </View>
  //     );
  //   };
  //   let string = "";
  //   for (let i = 0; i < n; i++) {
  //     for (let j = 0; j < n; j++) {
  //       if (i === 0 || i === n - 1) {
  //         string += "*";
  //       } else {
  //         if (j === 0 || j === n - 1) {
  //           string += "*";
  //         } else if (j === 0 + i || j === n - i) {
  //           string += "*";
  //         } else {
  //           string += ".";
  //         }
  //       }
  //     }
  //     string += "\n";
  //   }
  //   let string = "";

  //   for (let i = 0; i < n; i++) {
  //     for (let j = 0; j < n; j++) {
  //       if (i === 0 || i === n - 1) {
  //         string += "*";
  //       } else {
  //         if (j === 0 || j === n - 1) {
  //           string += "*";
  //         } else if (j === 0 + i || j === n - i) {
  //           string += "*";
  //         } else {
  //           string += ".";
  //         }
  //       }
  //     }
  //     string += "\n";
  //   }

  //   const rows = string.trim().split("\n");
  return (
    <React.Fragment>
      <Text style={styles.displayTxT}>Display</Text>
      <View style={styles.container}>{renderCells()}</View>
    </React.Fragment>
    // <View
    //   style={[
    //     styles.container,
    //     { width: containerSize, height: containerSize },
    //   ]}
    // >
    //   {Array.from({ length: n }).map((_, i) => (
    //     <TouchableOpacity style={styles.row} key={i}>
    //       {Array.from({ length: n }).map((_, j) => (
    //         <View
    //           key={`${i}${j}`}
    //           style={[
    //             styles.cell,
    //             i === 0 ||
    //             i === n - 1 ||
    //             j === 0 ||
    //             j === n - 1 ||
    //             i === j ||
    //             i + j === n - 1
    //               ? styles.cellActive
    //               : null,
    //           ]}
    //         />
    //       ))}
    //     </TouchableOpacity>
    //   ))}
    // </View>
    // <View style={{ flex: 1 }}>
    //   {Array.from({ length: gridSize }, (_, row) => renderRow(row))}
    // </View>
    // <TouchableOpacity style={styles.container}>
    //   <Text style={styles.text}>{string}</Text>
    // </TouchableOpacity>
    // <View style={styles.container}>
    //   {rows.map((row, index) => (
    //     <View key={index} style={styles.row}>
    //       {row.split("").map((char, charIndex) => (
    //         <Text key={charIndex} style={styles.char}>
    //           {char}
    //         </Text>
    //       ))}
    //     </View>
    //   ))}
    // </View>
  );
};
const styles = StyleSheet.create({
  //   container: {
  //     height: "100%",
  //     width: "100%",
  //     // flexDirection: "column",
  //     // alignItems: "center",
  //     // justifyContent: "center",
  //   },
  //   row: {
  //     flexDirection: "row",
  //   },
  //   char: {
  //     fontSize: 20,
  //     fontWeight: "bold",
  //     margin: 2,
  //   },
  //   container: {
  //     flex: 1,
  //     alignItems: "center",
  //     justifyContent: "center",
  //   },
  //   text: {
  //     fontFamily: "Courier New",
  //     fontSize: 20,
  //     lineHeight: 25,
  //   },
  //   row: {
  //     flexDirection: "row",
  //   },
  //   cell: {
  //     width: cellSize,
  //     height: cellSize,
  //     borderWidth: 1,
  //     borderColor: "black",
  //     backgroundColor: "white",
  //   },
  //   starCell: {
  //     backgroundColor: "yellow",
  //   },
  //   container: {
  //     flex: 1,
  //     flexDirection: "column",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     backgroundColor: "#f2f2f2",
  //   },
  //   row: {
  //     flexDirection: "row",
  //   },
  //   cell: {
  //     width: 30,
  //     height: 40,
  //     borderWidth: 1,
  //     borderColor: "#ccc",
  //   },
  //   cellActive: {
  //     backgroundColor: "yellow",
  //   },
  container: {
    // flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "black",
  },
  cellHighlighted: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "gray",
  },
  displayTxT: {
    fontSize: 16,
    textAlign: "center",
    color: "red",
    marginTop: 30,
    fontFamily: "Poppins-Bold",
  },
});
export default Pattern;
