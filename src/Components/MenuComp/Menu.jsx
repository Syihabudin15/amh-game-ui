import { Button, Col, Drawer, Row } from "antd";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { useSelector } from "react-redux";
import { MenuOutlined } from '@ant-design/icons';

import '../compStyle.css';
import { useState } from "react";

function Menu(){
    const [open, setOpen] = useState(false);
    const user = useSelector(state => state.user);
    return(
        <section title="menu section">
            <Row className="menu-wrap">
                <Col>
                    <LeftMenu/>
                </Col>
                <Col span={user.name ? 12 : 5} className="menu-window">
                    <RightMenu mode='horizontal'/>
                </Col>
                <Col className="menu-mobile">
                    <Button onClick={() => setOpen(true)}>
                        <MenuOutlined/>
                    </Button>
                </Col>
            </Row>
            <Drawer title='Menu' open={open} onClose={() => setOpen(false)} width={'70vw'}>
                <RightMenu mode='inline'/>
            </Drawer>
        </section>
    )
};


export default Menu;