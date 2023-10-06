import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from './localdb';
import PhonicSoundButton from './components/PhonicSoundButton'

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      text: '',
      chunks: [],
      PhonicSounds: [],
    }
  }

  render() {
    return (
      <safeAreaProvider>
        <View style={styles.container}>
          <header
            backgroundColor = {"#99C8210"}
              centerComponent={{
                text: 'Macaquinho Fofo',
                  style: {color: '#fff',fontSize: 20},
               }}
              />
                    <Image style={styles.imageIcon}
                    source={{
                      uri: 'https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png'
                    }}
                    />

              <TextInput
                style={styles.inputBox}
                onChangeText={(text) => {
                  this.setState({text: text});
                }}
                value={this.state.text}
                />

                <TouchableOpacity
                  style={styles.goButton}
                  onPress={()=>{
                    var word = this.state.text.toLowerCase().trim();
                    db[word] ? (
                      this.setState({chunks: db[word].chunks}),
                      this.setState({ PhonicSounds: db[word].phones})
                    ) :
                    Alert.alert("A palavra não existe em nosso banco de dados")
                  }}>

                <Text style={styles.buttonText}>IR</Text>
                </TouchableOpacity>
                <View>
                  {this.state.chunks.map((item, index) => {
                    return (
                      <PhonicSoundButton
                        wordChunks={this.state.chunks[index]}
                        soundChunk={this.state.phonicSounds[index]}
                        />
                    );


                  }
                  
                  )}

                </View>
        </View>
      </safeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    marginTop: 200,
    widht: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    outline: 'none',
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  displayText: {
    textAlign: 'center',
    fontSize: 30,
  },
  imageIcon: {
    widht: 150,
    height:150,
    marginLeft: 95,
  },
  chunkButton: {
    widht: '60%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: '10',
    margin: 5,
    backgroundColor: 'red',
  },
});
