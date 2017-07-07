import React, { Component, PropTypes } from 'react';
import ReactNative from 'react-native';
import { inject } from 'mobx-react';

import ownerAction from '../actions/Owner';
import { form, icon, color, utils } from '../styles/index';
import logoPng from '../images/logo.png';

const {
  KeyboardAvoidingView,
  Image,
  Button,
  TextInput,
  View,
  AsyncStorage
} = ReactNative;

@inject('owner')
class Login extends Component {

  static propTypes = {
    owner: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  componentWillMount() {
    const { owner } = this.props;
    AsyncStorage.getItem('@UserStore:name', (key, value) => {
      owner.name = value;
      this.setState({ name: value });
    });
  }

  _login = async () => {
    const { owner } = this.props;
    const sc = await ownerAction.login(owner.name, owner.password);
    if (sc === 0) {
      owner.setShowLogin(false);
    }
  };

  render() {
    const { owner } = this.props;

    return (
      <KeyboardAvoidingView behavior="padding" style={utils.verticalCenter}>
        <Image
          source={logoPng}
          style={[icon.big, form.logo]}
        />
        <TextInput
          style={form.input}
          value={this.state.name}
          underlineColorAndroid="transparent"
          placeholder="用户名／邮箱"
          onChangeText={(text) => {
            this.setState({ name: text });
            owner.name = text;
          }}
        />
        <TextInput
          style={form.input}
          underlineColorAndroid="transparent"
          placeholder="密码"
          secureTextEntry
          onChangeText={(text) => {
            owner.password = text;
          }}
        />
        <View style={form.button}>
          <Button
            onPress={this._login}
            color={color.green}
            title="登录"
            accessibilityLabel="登录"
          />
        </View>
        <View style={form.button}>
          <Button
            onPress={() => {
              owner.setShowLogin(false);
            }}
            color={color.green}
            title="取消"
            accessibilityLabel="取消"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default Login;
