import Moment from 'react-moment';
import moment from "moment";

export default function(props){
    return (
            <Moment data-tip={moment(props.children).calendar()} fromNow>
              {props.children}
            </Moment>
    );
}