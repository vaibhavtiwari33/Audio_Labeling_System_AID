import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import { IconButton, Button } from "../components/button";

const noop = () => {};

const Folder = ({
    onClick = noop,
    style,
    color,
    pos,
    z,
    hidden,
    id,
    disabled,
  }) => {
    return (
        <div>
            <Button
                size="lg"
                type="primary"
                onClick={onClick}
                style={{
                    borderRadius: "0px", 
                    backgroundColor: color, 
                    borderColor: color,
                    width: '30%', 
                    height: '50px',
                    right: pos,
                    zIndex: z,
                    position: 'absolute',
                    //hidden: hidden,
                }}
                text="test"
            />
            <div style={{ 
                top: '150px',
                height: '500px', 
                overflowY: 'scroll', 
                backgroundColor: color,  
                position: 'absolute', 
                zIndex: z,
                width: '100%', 
                left:'0%',
                hidden: hidden,
                }}
            >

            </div>
        </div>
        );
    };
export { Folder };