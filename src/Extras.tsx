import React from 'react';

export const Extras: React.FC<{}> = (props: {}) =>
    <footer>
        <div className="darker padded extras">
            Contact me at&#160;
            <a href = "mailto: abc@example.com">
                <u>abc@example.com</u>
            </a>
        </div>
    </footer>;

export default Extras;