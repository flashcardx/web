import Moment from 'react-moment';
import moment from "moment";
import PropTypes from 'prop-types';
 
function DDate(props){
    return (
            <Moment data-tip={moment(props.children).calendar()} fromNow>
              {props.children}
            </Moment>
    );
}

DDate.PropTypes = {
    children: PropTypes.string.isRequired
}

export default DDate; 
