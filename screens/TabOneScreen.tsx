import { Button, Pressable, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <EditScreenInfo path="/screens/yike/TabOneScreen.tsx" />
      <Pressable style={styles.button}>
        <Text>Press me!</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 15,
    backgroundColor: 'orange',
    paddingHorizontal: 30,
    margin: 10,
  },
  buttonOnPress: {
    borderRadius: 10,
    paddingVertical: 15,
    backgroundColor: 'red',
    paddingHorizontal: 30,
    margin: 10,
  },
});
