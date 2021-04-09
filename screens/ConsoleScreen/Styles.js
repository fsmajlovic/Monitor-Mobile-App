import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  container1: {
    backgroundColor: '#0D47A1',
  },
  container2: {
  },
  componentContainer: {
    height: "92%",
  },
  row: {
    flexDirection: 'row',
    padding: 3,
  },
  logRow: {
    width: "100%",
    justifyContent: "space-between",
  },
  textArea: {
    textAlignVertical: 'center',
    color: 'white',
    justifyContent: "flex-start",
  },
  tableHead: {
    color: 'black',
    justifyContent: "center",
    padding: 3,
    fontWeight: "bold",
  },
  inputArea: {
    justifyContent: "flex-start",
    color: 'white',
    alignItems: 'flex-start',
  },
  buttons: {
    height: "8%",
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
    borderRadius:1,
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
  }
})