import { Text } from 'native-base';
import React,{ Component }  from 'react';
import { View, FlatList, ActivityIndicator, } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import { Avatar } from 'react-native-elements';
class Autors_Screen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    this.makeRemoteRequest() 
   
  }

  makeRemoteRequest = () => {
    const url = `https://jsonplaceholder.typicode.com/users`;
    this.setState({ loading: true });
   
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res;
      })
      
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };
  

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()} ${item.email.toUpperCase()}`;
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
     
    if (this.state.loading) {
 
    } 
    return (
      <View  backgroundColor="#FFFFFF">
          <Text style={{ marginLeft:12, fontSize: 20,marginTop:20,marginBottom: 10 }} >Authors</Text>

        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
            onPress={() =>  {this.props.navigation.navigate('🔲', {autorId: item.id ,autorName:item.name })}}
              title={<Text style={{  fontSize: 17,marginBottom: 7,
                }} >{item.name}</Text>}
              subtitle={<Text style={{  fontSize: 13,
                color:'#808080'}}>{item.email}</Text>}
              leftElement={(<Avatar
                size="medium"
                rounded
                title={<Text style={{paddingTop:10}} >{item.name.match(/[A-Z]/g)}</Text>}
                
                backgroundColor='#72d499'
                activeOpacity={0.7}
                
                />)
             
              }
              rightElement={<Text>10 posts › </Text>} />
          )}
          keyExtractor={item => item.email}
          
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
 }
};

export default Autors_Screen;