import React, { Component } from 'react'
import { ColorBoxContainer } from '../styles/ColorBox';


export default class ColorBox extends Component {
   
    render() {
        return (
            <ColorBoxContainer
                isCursor={this.props.isCursor}
                boxHeight={this.props.boxHeight}
                boxWidth={this.props.boxWidth}
                boxSize={this.props.boxSize}
                boxColor={this.props.boxColor}
                selected={this.props.selected}
                onClick={this.props.onClick}
            >
                <div className='color'/>
            </ColorBoxContainer>
        )
    }
}

ColorBox.defaultProps = {
    isCursor: true,
    boxSize: "82%"
}
