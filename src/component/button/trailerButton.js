import React, { Component } from 'react';

class Trailer extends Component {
    render() {
        return (
            <React.Fragment>
                <div className='lg1: lg1:my-5 lg1:mx-auto flex sm:flex-col'>
                    <button className='lg1:absolute lg1:mr-0 sm:relative sm:m-2 bg-[#2bb0d8] hover:bg-w-blue-300 p-2 text-sm text-white'>
                        &#9658; Watch the trailer
                    </button>
                    <button className='lg1:absolute text-sm sm:m-2 lg1:mx-[20%] sm:relative bg-[#2bb0d8] hover:bg-w-blue-300 p-2 lg1:ml-40 text-white'>
                        Find out more
                    </button>
                </div>
            </React.Fragment>
        );
    }
}

export default Trailer;