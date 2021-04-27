import React, { CSSProperties } from 'react'
import Main from './Main'

const Layout = () => {
    return (
        <div style={rootStyle}>
            <Main/>
        </div>
    )
}

const rootStyle: CSSProperties = {
    width: '100%',
    minHeight: '100vh',
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f2e4bf'
}

export default Layout
