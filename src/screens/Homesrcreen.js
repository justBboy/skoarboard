import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import SnackBar from "react-native-snackbar-component";
import { setConnectedUsers, setIp } from "../store/actions";
import { useStore } from "../store/store";
const logo = require("../../assets/logo2.png");

const Homesrcreen = ({ navigation }) => {
  const [{socket, connectedUsers}, dispatch] = useStore();
  const [error, setError] = useState("");
  const [snackVisible, setSnackVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchConnectedUsers = () => {
      setLoading(true) 
      fetch("https://protected-fjord-44413.herokuapp.com/get")
        .then(res => res.json())
        .then(data => {
          setLoading(false);
          dispatch(setConnectedUsers(data))
        })
        .catch(err => {
          setLoading(false)
          setError("There was an error with the connection")
      })
  }
  useEffect(() =>{
    fetchConnectedUsers();
  }, [])

  /* useEffect(() => {
    let mounted = true;
    if (mounted){
      if(connectedClient){
        navigation.navigate("Controls");
      }
    }
    return () => {mounted=false}
  }, [currentRoom]) */

  useEffect(() => {
    if(socket){
      socket.on("connect", function(){
        navigation.navigate("Controls")
      })
      socket.on("error", function(){
        setError("There was an error with the connection");
      })
      //navigation.navigate("Controls");
    }
  }, [socket])

  useEffect(() => {
    if(error){
      setSnackVisible(true);
      setTimeout(() => {
        setSnackVisible(false);
      }, 5000)
    }
  }, [error])

  const handleConnection = useCallback(() => {
    fetchConnectedUsers() 
  }, [])

  const handleConnectWithClient = useCallback((ip) => {
    setLoading(true);
    dispatch(setIp(ip));
    setLoading(false);
    /* socket.emit("connectWithClient", {id, room: currentRoom}, (room_id) => {
      dispatch(setConnectedClient(id));
      dispatch(setRoom(room_id));
      setLoading(false)
    }) */
  }, [])

  return (
    <View style={styles.main}>
      <SnackBar visible={snackVisible} textMessage={error} actionText="Ok" actionHandler={() => {setSnackVisible(false)}} />
      <View style={styles.logcontainer}>
        <Image source={logo} style={{ width: 220, height: 70, marginTop: 20 }} />
      </View>

      <ScrollView style={styles.listcont}>
        {
          loading
          &&
          <ActivityIndicator size="large" color="#eee" /> 
        }
        {
          connectedUsers.map(u => (
            <TouchableOpacity
              key={u.platform}
              onPress={() => handleConnectWithClient(u.ip)}
              style={styles.listBtn}
            >
              <Text>{u.platform}</Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>

      <View style={styles.btncont}>
        <TouchableOpacity onPress={handleConnection} style={styles.searchBtn}>
          <Text style={[styles.regText]}>Search device</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Homesrcreen;

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#666",
    height: "100%",
    flexDirection: "column",
  },
  logcontainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 0.2,
    borderBottomWidth: 2,
    borderColor: "white",
  },
  listcont: {
    flex: 0.6,
    width: "100%",
    position: "relative",
    paddingTop: 10,
    paddingBottom: 15,
  },
  btncont: {
    flex: 0.2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtn: {
    backgroundColor: "#45D039",
    padding: 10,
    width: "60%",
    color: "#fff",
    fontSize: 20,
    borderRadius: 30,
  },
  regText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20
  },
  listBtn: {
    backgroundColor: "#ddd",
    padding: 8,
    width: "80%",
    borderRadius: 4,
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 6,
  },
});
