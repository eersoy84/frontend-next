// react
import { useState, useEffect, useRef } from 'react';
import {
    Container, TabContent, TabPane, Nav, NavItem, NavLink, Card, Row, Col,
} from 'reactstrap';
import classnames from 'classnames';
import AccountPageLogin from './AccountPageLogin';
import AccountPageRegister from './AccountPageRegister';

export default function AccountPageTabs({ defaultTab }) {
    const [activeTab, setActiveTab] = useState('1')
    useEffect(() => {
        if (defaultTab)
            setActiveTab(defaultTab)
    }, [defaultTab]);

    const toggle = (tab) => {
        if (activeTab !== tab)
            setActiveTab(tab);
    };
    return (
        <Container>
            <Row>
                <Col md="2" lg="3" />
                <Col md="8" lg="6">
                    <Nav pills justified>
                        <NavItem>
                            <NavLink
                                className={classnames('address_tab_link',
                                    { active: activeTab === '1' },
                                    { 'address_tab_link_text--active': activeTab === '1' })}
                                onClick={() => { toggle('1'); }}
                            >
                                Giriş Yap
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames('address_tab_link',
                                    { active: activeTab === '2' },
                                    { 'address_tab_link_text--active': activeTab === '2' })}
                                onClick={() => { toggle('2'); }}
                            >
                                Üye Ol
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Card body>
                                <AccountPageLogin />
                            </Card>
                        </TabPane>
                        <TabPane tabId="2">

                            <Card body>
                                <AccountPageRegister />
                            </Card>
                        </TabPane>
                    </TabContent>
                </Col>

            </Row>
        </Container>
    );
}
