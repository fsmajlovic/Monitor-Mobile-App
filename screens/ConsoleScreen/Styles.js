import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    height: "100%",
    flex: 1,
    flexDirection: 'row',
  },
  //buttoni u Console.js
  container1: {
    height: "8%",
    //   backgroundColor: '#0D47A1',
  },
  container2: {
  },
  //scrollView u Console.js
  scrollView: {
    height: "92%",
  },
  //container u ConsoleLog.js
  componentContainer2: {
    height: "100%",
    flex: 1,
  },
  //View u ConsoleLog.js
  container2: {
    height: "92%",
  },
  //kontejner u Console.js
  componentContainer1: {
    height: "100%",
    backgroundColor: '#0D47A1',
    flex: 1,
    //  flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    padding: 3,
  },
  logRow: {
    width: "100%",
    justifyContent: "space-between",
    textAlign: 'left',
  },
  textArea: {
    textAlignVertical: 'center',
    color: 'white',
    justifyContent: "flex-start",
    fontSize: 13,
  },
  tableHead: {
    color: 'black',
    //  justifyContent: "center",
    paddingLeft: 3,
    fontWeight: "bold",
    width: '22%',
    textAlign: "center",
    fontSize: 13,
  },
  log: {
    borderBottomWidth: 1,
  },
  tableRow: {
    fontSize: 12,
    textAlign: "left",
    width: '78%',
  },
  inputArea: {
    justifyContent: "flex-start",
    color: 'white',
    alignItems: 'flex-start',
  },
  buttons: {
    //  height: "8%",
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 160,
  },
  button: {
    alignSelf: 'center',
    textAlign: 'center',
    height: 35,
    width: 76,
    padding: 3,
    backgroundColor: 'white',
    borderRadius: 1,
    borderWidth: 0,
    justifyContent: 'center'
  },
  consoleButton: {
    backgroundColor: '#0D47A1',
  },
  buttonText: {
    textAlign: 'center',
    color: "#808080",
    fontSize: 18,
  },
  consoleButtonText: {
    textAlign: 'center',
    color: "white",
    fontSize: 18,
  },
  picker: {
    borderBottomWidth: 1,
    height: "8%",
  }
})