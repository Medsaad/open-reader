import React from 'react'

export default function List({children, item}) {
    return (
            <li className="minus" key={item._id}>
                {children}
            </li>
    )
}
