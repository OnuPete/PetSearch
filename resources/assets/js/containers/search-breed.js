import { connect } from 'react-redux';

import { postDog, searchChange } from '../actions';
import Search from '../components/search';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  handleInput: function(e) {
    const breed = e.target.value;
    console.log(e.charCode);
    if (e.charCode === 13) {
      console.log(breed);
      dispatch(postDog(breed));
    } else /* if (breed.length > 0) */{
      dispatch(searchChange(breed));
    }
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
