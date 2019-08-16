import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Table } from 'antd';
import { Input } from 'antd';
//import css
import '../home/home_css.css';
import 'antd/es/layout/style/css';
//import axios
import axios from 'axios';
// import 'antd/es/s/style/css';
const { Search } = Input;
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
        arrGradeID: [],
        arrRooms: [],
        dataInit: [],
        arrTempt2:[],
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    componentDidMount = () => {
        this.getAllGrade().then(() => {

            this.getRoomPerGrade();
        });
    }

    getEmpOfRoom = (roomID) => {
        return (axios.get(`https://haipm99api.herokuapp.com/api/room/getEmpRoom/${roomID}`)
            .then(res => {
                this.setState({
                    data: res.data.arrEmp,
                    dataInit: res.data.arrEmp
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
        return (axios.get('https://haipm99api.herokuapp.com/api/grade/getAllGrade').then(res => {
            this.setState({
                grades: res.data.arrGrade
            });
            this.state.grades.forEach(grade => {
                this.setState({
                    arrGradeID: [...this.state.arrGradeID, grade._id]
                })
            })
        }))
    }
    //get room of grade 
    getRoomOfGrade = (id) => {
        return (axios.get(`https://haipm99api.herokuapp.com/api/grade/getRoom/${id}`)
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
        this.getRoomOfGrade(gradeID);
        // this.toggle()
    }
    //
    getRoomCallBack = (id) => {
        return (
            axios.get(`https://haipm99api.herokuapp.com/api/grade/getRoom/${id}`)
                .then(res => {
                    this.setState({
                        arrRooms: [...this.state.arrRooms, res.data.room]
                    })
                })

        )
    }
    //get Room per grade
    getRoomPerGrade = () => {
        this.state.grades.forEach( (gr) => {
             axios.get(`https://haipm99api.herokuapp.com/api/grade/getRoom/${gr._id}`)
                .then(a => {
                    console.log(gr._id)
                    console.log(a.data.room)
                    this.setState({
                        arrRooms: [...this.state.arrRooms, a.data.room]
                    })
                    this.setState({
                        arrTempt2 :[...this.state.arrTempt2,gr]
                    })
                });
        })
    }
    //live search
    searchByChange = (keyword) => {
        const arrName = [];
        keyword = keyword.toUpperCase();
        this.state.dataInit.forEach(emp => {
            if (emp.fullName.includes(keyword)) {
                arrName.push(emp)
            }
        })
        if (arrName.length > 0) {
            this.setState({
                data: [...arrName]
            })
        }
        else {
            this.setState({
                data: []
            })
        }
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
        var room1 = [];
        var room2 = [];
        var room3 = [];
        if (this.state.arrRooms[0]) {
            room1 = this.state.arrRooms[0].map((item, index) => {
                return (
                    <Menu.Item key={index + 100} onClick={this.changeRoomID.bind(this, item._id)}>
                        <Icon type="user" />
                        <span>{item.roomName}</span>
                    </Menu.Item>
                )
            })
        }
        if (this.state.arrRooms[1]) {
            room2 = this.state.arrRooms[1].map((item, index) => {
                return (
                    <Menu.Item key={index + 200} onClick={this.changeRoomID.bind(this, item._id)}>
                        <Icon type="user" />
                        <span>{item.roomName}</span>
                    </Menu.Item>
                )
            })
        }
        if (this.state.arrRooms[2]) {
            room3 = this.state.arrRooms[2].map((item, index) => {
                return (
                    <Menu.Item key={index + 300} onClick={this.changeRoomID.bind(this, item._id)}>
                        <Icon type="user" />
                        <span>{item.roomName}</span>
                    </Menu.Item>
                )
            })
        }
        const arrTempt = [];
        arrTempt.push(room1);
        arrTempt.push(room2);
        arrTempt.push(room3);
        return (
            // <div className="container-home">
            <Layout style={{ width: '100%' }}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} className="side-bar-left">
                    <div className="logo">
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <SubMenu
                            key='1'
                            title={<span><Icon type="play-circle" />{
                                this.state.arrTempt2[0] ?
                                    this.state.arrTempt2[0].gradeName
                                    : null
                            }</span>}
                        >
                            {arrTempt[0]}
                        </SubMenu>
                        <SubMenu
                            key='2'
                            title={<span><Icon type="play-circle" />{
                                this.state.arrTempt2[1] ?
                                    this.state.arrTempt2[1].gradeName
                                    : null
                            }</span>}
                        >
                            {arrTempt[1]}
                        </SubMenu>
                        <SubMenu
                            key='3'
                            title={<span><Icon type="play-circle" />{
                                this.state.arrTempt2[2] ?
                                    this.state.arrTempt2[2].gradeName
                                    : null
                            }</span>}
                        >
                            {arrTempt[2]}
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0, height: '7vh' }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <Search style={{ width: '40vh', marginTop: '10px' }} placeholder="input search text" name="txtSearch" onSearch={value => this.searchByChange(value)} onChange={e => this.searchByChange(e.target.value)} enterButton />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                            height: '80vh'
                        }}>
                        <Table columns={columns} dataSource={data} />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
export default home;