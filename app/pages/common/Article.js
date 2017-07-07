import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  Button,
  Modal
} from 'react-native';
import { inject, observer } from 'mobx-react';

import articleAction from '../../actions/Article';
import ownerAction from '../../actions/Owner';
import Login from '../../components/Login';

@inject('article', 'owner')
@observer
class Article extends Component {
  static propTypes = {
    owner: PropTypes.object.isRequired,
    article: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  };

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.stackTitle,
    tabBarVisible: false
  });

  componentWillMount() {
    const { article } = this.props;
    ownerAction.isLogin();
    article.setOId(this.props.navigation.state.params.oId);
    articleAction.getDetail(1);
  }

  _goUpdate = async () => {
    const { owner } = this.props;
    if (owner.isLogin) {
      this.props.navigation.navigate('MemberPost', { stackTitle: '更新' });
    } else {
      owner.setShowLogin(true);
    }
  };

  render() {
    const { article, owner } = this.props;

    return (
      <View>
        <Modal visible={owner.showLogin} onRequestClose={() => null}>
          <Login />
        </Modal>
        {
          (article.type !== 3 && owner.name === article.authorName) ?
            <Button title={'更新'} onPress={this._goUpdate} /> :
          null
        }
        <Text>{article.content}</Text>
      </View>
    );
  }
}

export default Article;
