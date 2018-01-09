
import { connect } from 'react-redux';

import { addToWishList, highlightDog } from '../actions';
import List from '../components/list';

const mapStateToProps = state => ({
  list: state.dogSearch.map(dog => dog.breed),
  val: state.currentDog,
  icon: 'glyphicon-plus-sign'
});

const mapDispatchToProps = dispatch => ({
  handleClick: (breed) => {
    // e.preventDefault();
    dispatch(addToWishList(breed));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
