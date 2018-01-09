import { connect } from 'react-redux';

import { removeFromWishList } from '../actions';
import List from '../components/list';

const mapStateToProps = state => ({
  list: state.dogWishList,
  val: null,
  icon: 'glyphicon-remove-sign'
});

const mapDispatchToProps = dispatch => ({
  handleClick: (breed) => {
    dispatch(removeFromWishList(breed));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
