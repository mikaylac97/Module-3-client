import React, { Component } from 'react'

export default class Discussion extends Component {
    render() {
        return (
            <div>
                <form>
                    <label>
                        Title: 
                        <input type='text' name='title'/>
                    </label>
                    <label>
                        Discussion: 
                        <input type='text' name='discussion'/>
                    </label>
                </form>
            </div>
        )
    }
}
