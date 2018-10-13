import {connect} from 'react-redux';

import {Counter} from '../components/counter/Counter';
import {INCREMENT, DECREMENT} from '../constants/ActionTypes';

const mapDispatchToProps = (dispatch) => {
  return ({
    increment() {
      dispatch({type: INCREMENT});
    },
    decrement() {
      dispatch({type: DECREMENT});
    }
  });
};

const mapStateToProps = (state) => {
  return {
    Counter: state.Counter
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);