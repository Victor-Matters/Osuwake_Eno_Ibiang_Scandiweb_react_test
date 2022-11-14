import React, { Component } from 'react'
import { ColorBoxContainer } from '../styles/ColorBox';


export default class ColorBox extends Component {
   
    render() {
        return (
            <ColorBoxContainer
                boxHeight={this.props.boxHeight}
                boxWidth={this.props.boxWidth}
                boxColor={this.props.boxColor}
                selected={this.props.selected}
                onClick={this.props.onClick}
            >
                <div className='color'/>
            </ColorBoxContainer>
        )
    }
}
