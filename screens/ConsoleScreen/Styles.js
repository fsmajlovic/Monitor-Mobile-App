import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: '#0D47A1',
  },
  row: {
    flexDirection: 'row',
    padding: 3,
  },
  textArea: {
    textAlignVertical: 'center',
    color: 'white',
    justifyContent: "flex-start",
    //   backgroundColor:"#012456",
    //    color: "#D6FFFF"
  },
  inputArea: {
    justifyContent: "flex-start",
    color: 'white',
    //   backgroundColor:"#415c77",
    //   color: "#e5eaea",
    alignItems: 'flex-start',
  }
})