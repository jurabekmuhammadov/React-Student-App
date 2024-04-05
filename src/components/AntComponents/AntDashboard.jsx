import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import "../../ant.scss";
import { Link, NavLink } from "react-router-dom";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import Orders from "../MuiConponents/Orders";
import { useAuth } from "../../hooks/useAuth";
import PropTypes from "prop-types";

const { Header, Sider, Content } = Layout;

const AntSidebar = ({ title }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { userFromServer } = useAuth();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <PeopleAltIcon />,
              label: <Link to={"/home"}>Students</Link>,
            },
            {
              key: "2",
              icon: <PeopleOutlineIcon />,
              label: <Link to={"/teachers"}>Teachers</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <NavLink
            to="/profile"
            title={"View profile"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontWeight: 700,
              textDecoration: "none",
              color: "black",
            }}
          >
            {userFromServer.username}
            <img
              src={userFromServer.avatar}
              alt=""
              style={{ borderRadius: "50%", width: "40px", height: "40px" }}
            />
          </NavLink>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <h1 style={{ marginBottom: "20px" }}>{title}</h1>
          <Orders />
        </Content>
      </Layout>
    </Layout>
  );
};

AntSidebar.propTypes = {
  title: PropTypes.string,
};

export default AntSidebar;
