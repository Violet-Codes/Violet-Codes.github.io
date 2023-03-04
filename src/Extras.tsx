import React from 'react';

export const Extras: React.FC<{}> = (props: {}) =>
    <footer>
        <div className='darker extras'>
            Contact me at
            &#160;
            <a href = "mailto: abc@example.com">
                abc@example.com
            </a>
        </div>
    </footer>;

export default Extras;