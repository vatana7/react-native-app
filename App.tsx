import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, Text, StyleSheet, TextInput, Pressable, Button, View, FlatList } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MonoText } from './components/StyledText';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import _ from 'lodash';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [goal, setGoal] = useState<string>('');
  const [goalList, setGoalList] = useState<string[]>([]);

  function goalHandler(textInput: string) {
    setGoal(textInput);
  }

  function addGoal() {
    if (!_.isEmpty(goal) && !_.includes(goalList, goal)) {
      setGoalList((prev) => [...prev, goal]);
      setGoal('');
    } else {
      invalidTextAlert();
    }
  }

  const invalidTextAlert = () =>
    Alert.alert('Your text is neither valid or unique', '', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'destructive',
      },
      { text: 'Continue', onPress: () => null },
    ]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      // <SafeAreaProvider>
      //   <Navigation colorScheme={colorScheme} />
      //   <StatusBar />
      // </SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable style={styles.enterGoal}>
            <TextInput
              placeholder="Enter your goal..."
              style={{ paddingVertical: 10, paddingHorizontal: 10 }}
              onChangeText={goalHandler}
            />
          </Pressable>
          <Button title="Add goal" color="black" onPress={addGoal} />
        </View>

        <View style={styles.goalList}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, color: '#1E2328' }}>
              {goalList.length > 0 ? 'List of goals' : 'No goals :('}{' '}
            </Text>
            {goalList.length > 0 && <AntDesign name="down" size={24} color="black" />}
          </View>

          <FlatList
            data={goalList}
            style={{ paddingVertical: 10, overflow: 'hidden' }}
            renderItem={(item) => {
              return (
                <View style={{ borderRadius: 3, borderColor: 'black', backgroundColor: 'white', marginVertical: 10 }}>
                  <MonoText style={styles.monoText}>{item.item}</MonoText>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingHorizontal: 16,
    backgroundColor: '#FED053',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 4,
    paddingBottom: 20,
    borderBottomColor: 'black',
  },
  enterGoal: {
    backgroundColor: 'white',
    borderRadius: 12,
    flex: 1,
    borderWidth: 2,
    borderColor: '#3B3F46',
    marginRight: 10,
  },
  goalList: {
    paddingVertical: 20,
    flex: 1,
    overflow: 'scroll',
  },
  monoText: {
    padding: 10,
    borderRadius: 10,
  },
});
