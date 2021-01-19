import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator,StyleSheet } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { Card } from 'react-native-paper';
class Posts_Screen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      autorId: props.route.params.autorId,
      autorName:props.route.params.autorName
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const autorId = this.state.autorId;
 
    const url = 'https://jsonplaceholder.typicode.com/posts';
    this.setState({ loading: true });

    fetch(url)
    
      .then((res) => res.json())
      .then((res) => {
        
        this.setState({
          data: res.filter(d=>d.userId===autorId),
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.filter(d=>d.userId===autorId)
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#00000',
          marginLeft: '14%',
          borderEndColor:"#00000"
        }}
      />
    );
  };
  searchFilterFunction = (text) => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter((item) => {
      const itemData = `${item.title.toUpperCase()} ${item.body.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <View  style={{ marginLeft:8, marginRight:7}}  >
      <SearchBar
        platform='ios'
        placeholder="Search"
        onChangeText={(text) => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      /></View>
    );
  };

  render() {
    const autorName = this.state.autorName;
  
  
    if (this.state.loading) {
      return (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View   backgroundColor="#FFFFFF" style={{ flex: 1 }}>
        
        <Text style={{ marginLeft:12, fontSize: 20,marginTop:20,marginBottom: 10}} >{autorName}`s Posts</Text>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
         <Card 
         style={{ marginLeft:12, padding: 15, width: 350,marginTop:20, marginBottom: 10,shadowColor: '#000',
         shadowOffset: { width: 0, height: 7 },
         shadowOpacity: 0.4,
         shadowRadius: 4,  }}
       ><Text style={{ fontSize: 17,marginBottom: 10}}>{item.title.charAt(0).toUpperCase()+item.title.slice(1)}</Text>
         <Text style={{fontSize: 13, marginBottom: 10, color:'#808080' }}>
         {item.body} 
         </Text>
       </Card>

          )}
          keyExtractor={(item) => item.title}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
        
       
      </View>
     
    );
 
 }
}

export default Posts_Screen;