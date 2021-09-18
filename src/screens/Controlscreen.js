import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  TextInput,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import { useStore } from "../store/store";
const logo = require("../../assets/logo2.png");

const Controlscreen = ({ navigation }) => {
  const [click, setClick] = React.useState(false);
  const [{socket}, dispatch] = useStore();
  const [text, setText] = useState("");
  const [lastText, setLastText] = useState("");
  let inputRef = useRef(null);
  const slideAnim = useRef(new Animated.Value(-320)).current;
  let interval;

  useEffect(() => {
    if(!socket){
      navigation.goBack()
    }
    socket.on("is_input", () => {
      if(inputRef.current){
        inputRef.current.focus()
      }
    })
    socket.on("not_input", () => {
      if(inputRef.current){
        Keyboard.dismiss()
      }
    })
  }, [socket])

  const handleCommand = (command) => {
    socket.emit("command", command);
  }

  const handlePressIn = (command) => {
    interval = setInterval(() => {
      handleCommand(command);
    }, 200)
  }

  const handlePressOut = () => {
    if (interval){
      clearInterval(interval);
    }
  }

    useEffect(() => {
      if (lastText){
        socket.emit("new_text", lastText);
      }
    }, [text, lastText])
  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
    }).start();
  };
  const slideOut = () => {
    Animated.timing(slideAnim, {
      toValue: -320,
      duration: 500,
    }).start();
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.main}>
            <TextInput value={text} style={{
              opacity: 0,
              display: "none"
            }} ref={inputRef} 
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace"){
                handleCommand("backspace");
              }
            }} 
            onChangeText={newText => {
                setText(newText);
                if(newText.length > text.length){
                  setLastText(newText.substr(newText.length - 1))
                }
                else{
                  setLastText("");
                }
              }} />
        <SideBar animation={slideAnim} toggle={slideOut} />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={slideIn}
            style={{ position: "absolute", left: 5, top: 31, zIndex: 999 }}
          >
            <Entypo name="menu" size={40} style={{ color: "#fff" }} />
          </TouchableOpacity>
          <Image source={logo} style={{ height: 100, width: 190 }} />
        </View>

        <View style={styles.backBtn}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.navigate("Home")}
          >
            <Entypo name="back" size={30} style={{ color: "#fff" }} />
          </TouchableOpacity>
        </View>
        <View style={styles.controllersMaim}>
          <View style={styles.controllMain}>
            <View style={styles.controllSub}>
              <View style={styles.verticalBtnCont}>
                <TouchableOpacity
                  activeOpacity={0.2}
                  onPress={() => {handleCommand("up")}}
                  onPressIn={() => {handlePressIn("up")}}
                  onPressOut={() => {handlePressOut()}}
                  style={styles.button}>
                  <MaterialIcons
                    name="arrow-drop-up"
                    style={{ color: "#fff" }}
                    size={50}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {handleCommand("down")}}
                  onPressIn={() => {handlePressIn("down")}}
                  onPressOut={() => {handlePressOut()}}
                  activeOpacity={0.2}
                  style={[styles.button, {alignItems: "flex-end"}]}>
                  <MaterialIcons
                    name="arrow-drop-down"
                    style={{ color: "#fff" }}
                    size={50}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.horizontalBtnCont}>
                <TouchableOpacity 
                activeOpacity={0.2}
                  onPress={() => {handleCommand("left")}}
                  onPressIn={() => {handleCommand("left")}}
                  onPressOut={() => {handlePressOut()}}
                style={styles.button2}>
                  <MaterialIcons
                    name="arrow-left"
                    style={{ color: "#fff" }}
                    size={50}
                  />
                </TouchableOpacity>
                <TouchableOpacity  
                  activeOpacity={0.2}
                  onPress={() => {handleCommand("right")}}
                  onPressIn={() => {handlePressIn("right")}}
                  onPressOut={() => {handlePressOut()}}
                  style={[styles.button2, {alignItems: "flex-end"}]}>
                  <MaterialIcons
                    name="arrow-right"
                    style={{ color: "#fff" }}
                    size={50}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.centerBtn}>
                <TouchableOpacity
                  activeOpacity={0.2}
                  onPress={() => {handleCommand("enter")}}
                  style={styles.centerbutton}
                ></TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default Controlscreen;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#777",
    flex: 1,
    paddingTop: 30,
    position: "relative",
  },
  subContainer: {
    width: "100%",
    height: 250,
    backgroundColor: "#fff",
    position: "relative",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    position: "relative",
    marginTop: -30,
  },
  backBtn: {
    backgroundColor: "#192531",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 30,
  },
  back: {
    backgroundColor: "#192531",
    width: 56,
    height: 56,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 20,
    borderWidth: 3,
    borderColor: "#333",
  },
  controllMain: {
    width: 280,
    height: 280,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 140,
  },
  controllSub: {
    backgroundColor: "#192531",
    width: 280,
    height: 280,
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    borderRadius: 140,
    borderWidth: 3,
    borderColor: "#999",
  },
  verticalBtnCont: {
    height: "100%",
    width: 120,
    position: "absolute",
    left: "28%",
    top: 0,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
  },
  horizontalBtnCont: {
    height: 120,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    borderRadius: 20,
  },
  button: {
    width: "100%",
    flexDirection: "row",
    zIndex: 400,
    justifyContent: "center",
    height: 70,
  },
  button2: {
    height: "100%",
    zIndex: 400,
    justifyContent: "center",
    width: 70,
  },
  centerBtn: {
    width: 150,
    height: 150,
    position: "absolute",
    borderRadius: 90,
    left: "22.3%",
    top: "23.3%",
  },
  centerbutton: {
    width: 150,
    height: 150,
    borderRadius: 90,
    backgroundColor: "#fff",
  },
  controllersMaim: {
    width: "100%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
});

const SideBar = ({ animation, toggle }) => {
  const text = {
    fontSize: 20,
    color: "#fff",
    marginLeft: 10,
  };

  return (
    <Animated.View
      style={{
        backgroundColor: "#353535",
        flexDirection: "column",
        height: "100%",
        width: "75%",
        position: "absolute",
        bottom: 0,
        top: 30,
        left: animation,
        elevation: 10,
        zIndex: 999,
      }}
    >
      <TouchableOpacity
        onPress={toggle}
        style={{
          position: "absolute",
          right: -18,
          top: 0,
          backgroundColor: "#353535",
          borderTopRightRadius: 18,
          borderBottomRightRadius: 18,
          zIndex: 999,
          height: 50,
          width: 50,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Feather
          name="arrow-left-circle"
          size={40}
          style={{
            color: "#45D039",
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "space-around",
          paddingLeft: 20,
        }}
      >
        <View style={{ marginTop: -70 }}>
          <Text style={{ color: "#FFF", fontSize: 33, fontWeight: "700" }}>
            Connected to:
          </Text>
          <Text
            style={{
              color: "#45D039",
              fontSize: 20,
              marginLeft: 20,
              marginTop: 7,
            }}
          >
            Skorbard.146
          </Text>
        </View>

        <View style={{ marginTop: -20 }}>
          <Text style={{ fontSize: 33, fontWeight: "700", color: "#fff" }}>
            About
          </Text>
          <Text style={{ ...text, marginTop: 5 }}>Skorbard Controller</Text>
          <Text style={{ ...text }}>Version 1.0.03b</Text>
          <Text style={{ ...text }}>lorem ipsom</Text>
        </View>
      </View>
    </Animated.View>
  );
};
