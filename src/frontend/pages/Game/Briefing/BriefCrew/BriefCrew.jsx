import React, { useEffect, useRef } from 'react';


import { Block, Caption } from "@randajan/react-form";

import { HiddenMsg } from '../../../../elements/HiddenMsg/HiddenMsg';

import { game } from "../../../../game";

import "./BriefCrew.scss";





export const BriefCrew = props=>{
    const { id, name, isAlly, code, enemies } = props;

    const enms = enemies.filter(r=>r.code !== code).map(e=>e.name).join(", ");

    const hl = Number.jet.rnd(game.board.get("crews.minName"), game.board.get("crews.maxName"))*game.board.get("crews.countEnemy");

    return (
        <Block level={0} caption={name} className="BriefCrew" data-role={isAlly ? "ally" : "enemy"}>
            <Block className="grid">
                <Caption>Passcode</Caption>
                <HiddenMsg value={code} pattern={"runic"}/>
                <Caption>Role</Caption>
                <HiddenMsg value={isAlly ? "Alliance" : "Resistance"} pattern={"runic"}/>
                <Caption>Partners</Caption>
                <HiddenMsg className="partners" value={isAlly ? "-" : enms} pattern={"runic"} length={hl}/>
            </Block>

        </Block>
    )
}
