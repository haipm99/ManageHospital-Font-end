import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Table } from 'antd';
//import css
import '../home/home_css.css';
import 'antd/es/layout/style/css';
//import axios
import axios from 'axios';
// import 'antd/es/s/style/css';
const { Header, Content, Sider } = Layout;

class home extends Component {
    state = {
        collapsed: false,
        rooms: [],
        roomID: '5d48f9d66d5ca0311c593504',
        data: [],
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    componentDidMount = () => {
        this.getAllRoom();
        this.getEmpOfRoom(this.state.roomID);
    }

    getEmpOfRoom = (roomID) => {
        return (axios.get(`http://localhost:5000/api/room/getEmpRoom/${roomID}`)
            .then(res => {
                console.log(res.data.arrEmp);
                this.setState({
                    data : res.data.arrEmp
                })
            }))
    }

    getAllRoom = () => {
        return (axios.get('http://localhost:5000/api/room/getAllRoom')
            .then(res => {
                this.setState({
                    rooms: res.data.rooms
                })
            }))
    }
    setListEmp = (item, index) => {
        const iteEmp = {
            key: index,
            name: item.fullName,
            id: item.empID,
            dob: item.dob,
            sex: item.sex,
            major: item.major,
            position: item.position
        };

        this.setState({
            data : [this.state.data,iteEmp]
        })
    }


    render() {
        const columns = [
            {
                title: 'EmpID',
                dataIndex: 'empID',
                key: 'empID',
            },
            {
                title: 'Name',
                dataIndex: 'fullName',
                key: 'fullName',
                render: text => <a href="/">{text}</a>,
            },
            {
                title: 'Sex',
                dataIndex: 'sex',
                key: 'sex'
            },
            {
                title: 'DOB',
                dataIndex: 'dob',
                key: 'dob',
            },
            {
                title: 'MAJOR',
                dataIndex: 'major',
                key: 'major'
            },
            {
                title: 'POSITION',
                dataIndex: 'position',
                key: 'position',
            }
        ];
        const data = this.state.data;
        // console.log(emp)
        const rooms = this.state.rooms.map((item, index) => {
            return (
                <Menu.Item key={index + 1}>
                    <Icon type="user" />
                    <span>{item.roomName}</span>
                </Menu.Item>
            )
        })
        return (
            // <div className="container-home">
            <Layout style={{ width: '100%' }}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} className="side-bar-left">
                    <div className="logo">

                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        {rooms}
                    </Menu>
                </Sider>
                <Layout>
                    {/* <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header> */}
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                            height:'90vh'
                        }}>
                        <Table columns={columns} dataSource={data} />
                    </Content>
                </Layout>
            </Layout>
            // </div>
        );
    }
}
export default home;