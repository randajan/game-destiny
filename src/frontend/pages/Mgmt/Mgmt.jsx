import React, { useEffect, useState } from 'react';
import { Link, Route } from "@randajan/jet-react/dom";

import "./Mgmt.scss";
import { pages } from '../../config/pages';
import { useGame } from '../../config/game';

const getLinks = (nodes)=>[].concat(...pages.map(({id, title, path, hidden})=>{
    if (hidden) { return []; }
    if (id !== "page-node") { return [<Link key={id} to={path}>{title}</Link>]; }
    if (!nodes) { return []; }
    return Object.values(nodes).map(({id, title})=>{
        return <Link key={id} to={path.replace(":id", id)}>{title}</Link>;
    });
}));

export const Mgmt = (props)=>{
    const nodes = useGame("solid.nodes");
    const [links, setLinks] = useState(_=>getLinks(nodes));

    useEffect(_=>{ setLinks(getLinks(nodes)); }, [nodes]);
    
    return (
        <div className="Mgmt">
            <div className="links">{links}</div>
        </div>
    )
}

