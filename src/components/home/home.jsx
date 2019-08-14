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
const { SubMenu } = Menu;
class home extends Component {
    state = {
        collapsed: false,
        rooms: [],
        gradeID: '',
        roomID: '',
        data: [],
        grades: [],
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    componentDidMount = () => {
        this.getAllGrade();
        this.getAllRoom();
        // this.getEmpOfRoom(this.state.roomID);
    }

    getEmpOfRoom = (roomID) => {
        return (axios.get(`http://localhost:5000/api/room/getEmpRoom/${roomID}`)
            .then(res => {
                console.log(res.data.arrEmp);
                this.setState({
                    data: res.data.arrEmp
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
    //get all grade
    getAllGrade = () => {
        return (axios.get('http://localhost:5000/api/grade/getAllGrade').then(res => {
            this.setState({
                grades: res.data.arrGrade
            })
        }))
    }
    //get room of grade 
    getRoomOfGrade = (id) => {
        return (axios.get(`http://localhost:5000/api/grade/getRoom/${id}`)
            .then(res => {
                this.setState({
                    rooms: res.data.room
                })
            })
        )
    }
    // change id room
    changeRoomID = (roomID) => {
        this.getEmpOfRoom(roomID);
        this.setState({
            roomID: roomID
        });
    }

    // change id grade
    changeGradeID = (gradeID) => {
        console.log(gradeID)
        this.getRoomOfGrade(gradeID);
        // this.toggle()
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
        const arrTemp = [];
        // console.log(emp)
        const rooms = this.state.rooms.map((item, index) => {
            return (
                <Menu.Item key={index + 1} onClick={this.changeRoomID.bind(this, item._id)}>
                    <Icon type="user" />
                    <span>{item.roomName}</span>
                </Menu.Item>
            )
        })
        arrTemp.push(rooms);
        console.log(arrTemp)
        const grades = this.state.grades.map((item, index) => {
            return (
                <SubMenu
                    onTitleClick={this.changeGradeID.bind(this, item._id)}
                    // onTitleMouseLeave= {this.changeGradeID.bind(this,'0')}
                    key={index}
                    title={<span><Icon type="play-circle" />{item.gradeName}</span>}
                >
                   {rooms}
                </SubMenu>
            )
        })
        return (
            // <div className="container-home">
            <Layout style={{ width: '100%' }}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} className="side-bar-left">
                    <div className="logo">
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        {grades}
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0, height: '5vh' }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                            height: '85vh'
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