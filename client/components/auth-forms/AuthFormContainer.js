import React from 'react';

export default function({ children, style }){
    return (
        <div className={style}>
            { children }
        </div>
    );
}