import React, {Component} from "react";
import Radium from "radium";
import ReactDOM from 'react-dom';
import {Editor, EditorState} from 'draft-js';
require("draft-js/dist/Draft.css");
require("../../../public/css/textEditor.css");
class MyEditor extends Component{

     constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
        this.onChange = (editorState) => this.setState({editorState});
    }

    render(){
        return (      <Editor {...this.props} editorState={this.state.editorState} onChange={this.onChange}
                        />);
    }

} 

export default Radium(MyEditor);