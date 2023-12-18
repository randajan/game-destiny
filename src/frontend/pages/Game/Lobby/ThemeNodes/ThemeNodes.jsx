import React from 'react';

import "./ThemeNodes.scss";
import { Block, Caption, usePop, Button } from '@randajan/react-form';
import { game } from '../../../../modules/game';
import { store } from '../../../../config/bases';
import { ThemeSelect } from '../ThemeSelect/ThemeSelect';

const setNodeClient = (clientId, nodeId) => {
    const themeId = game.board.get("theme.id");
    if (!themeId || !clientId) { return []; }
    return game.board.set(["clients", clientId, "game", themeId, "node"], {
        id: nodeId, setAt: new Date()
    });
}

const NodeSetup = props => {
    const { pop, node, client, clients } = props;

    const [_myId] = store.use("client.id");
    const myId = _myId.get();

    return (
        <Block className={"NodeSetup"} caption={node.title}>
            <div className="clients">
                {jet.forEach(clients, (v, id) => {

                    const className = jet.melt(["client", id == myId ? "local" : "remote"], " ");
                    const onClick = _ => {
                        setNodeClient(id, node.id);
                        pop.down();
                    }

                    return (
                        <Button key={id} className={className} onSubmit={onClick}>
                            {v.name}
                        </Button>
                    )
                })}
            </div>
            <div className="controls">
                <Button onSubmit={_ => { pop.down(); }}>Back</Button>
                <Button onSubmit={_ => { setNodeClient(client.id); pop.down(); }}>Clear</Button>
            </div>
        </Block>
    )
}

export const ThemeNodes = (props) => {

    const pop = usePop({ lock: true });

    const [_clients] = game.board.use("clients");
    const [_nodes] = game.board.use("theme.nodes");

    const clients = _clients.get();
    const nodes = _nodes.get();

    return (
        <Block className="ThemeNodes" caption={"Nodes" + String.jet.quote(nodes?.length, " (", ")")}>
            <div className="flex">
                {nodes?.map((v, key) => {
                    const client = clients[v.client];
                    const onClick = _ => pop.up(<NodeSetup pop={pop} node={v} client={client} clients={clients} />);
                    return (
                        <Button key={key} className="node" onSubmit={onClick}>
                            <Caption>{v.title}</Caption>
                            <div className="client">{ client?.name || "..."}</div>
                        </Button>
                    )
                })}
            </div>
        </Block>
    )
}



