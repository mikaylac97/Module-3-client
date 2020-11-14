import React, { Component } from 'react'

export default class Review extends Component {
    render() {
        return (
            <div>
                <form>
                    <label>
                        Stars / 5
                        <input type='number' min='0' max='5' name='rating' />
                    </label>
                    <label>
                        Review
                        <input type='text' name='review' />
                    </label>
                </form>
            </div>
        )
    }
}
