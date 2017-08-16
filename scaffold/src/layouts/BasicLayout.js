import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, Avatar, Dropdown } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import styles from './BasicLayout.less';
import HeaderSearch from '../components/HeaderSearch';
import NotificationIcon from '../components/NotificationIcon';
import GlobalFooter from '../components/GlobalFooter';
import { menus } from '../common/nav';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

class BasicLayout extends React.PureComponent {
  static childContextTypes = {
    routes: PropTypes.array,
    params: PropTypes.object,
  }
  state = {
    mode: 'inline',
  };
  getChildContext() {
    const { routes, params } = this.props;
    return { routes, params };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'user/fetchCurrent',
    });
  }
  onCollapse = (collapsed) => {
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  }
  onMenuClick = ({ key }) => {
    if (key === 'logout') {
      this.props.dispatch(routerRedux.push('/user/login'));
    }
  }
  getDefaultCollapsedSubMenus() {
    const currentMenuSelectedKeys = [...this.getCurrentMenuSelectedKeys()];
    currentMenuSelectedKeys.splice(-1, 1);
    return currentMenuSelectedKeys;
  }
  getCurrentMenuSelectedKeys() {
    const { location: { pathname } } = this.props;
    const keys = pathname.split('/').slice(1);
    if (keys.length === 1 && keys[0] === '') {
      return [menus[0].key];
    }
    return keys;
  }
  getNavMenuItems(menusData, parentPath = '') {
    return menusData.map((item) => {
      if (!item.name) {
        return null;
      }
      const itemPath = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
      if (item.children && item.children.some(child => child.name)) {
        return (
          <SubMenu
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.name}</span>
              </span>
            }
            key={item.key || item.path}
          >
            {this.getNavMenuItems(item.children, itemPath)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key || item.path}>
          <Link to={itemPath}>
            <Icon type={item.icon} />
            <span>{item.name}</span>
          </Link>
        </Menu.Item>
      );
    });
  }
  getPageTitle() {
    const { routes } = this.props;
    for (let i = routes.length - 1; i >= 0; i -= 1) {
      if (routes[i].breadcrumbName) {
        return `${routes[i].breadcrumbName} - Ant Design Pro`;
      }
    }
    return 'Ant Design Pro';
  }
  toggle = () => {
    const { collapsed } = this.props;
    this.props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: !collapsed,
    });
  }
  render() {
    const { children, currentUser, collapsed } = this.props;

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item><Icon type="user" />个人中心</Menu.Item>
        <Menu.Item><Icon type="setting" />设置</Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout"><Icon type="logout" />退出登录</Menu.Item>
      </Menu>
    );

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            breakpoint="md"
            onCollapse={this.onCollapse}
            style={{ minHeight: '100vh' }}
            width={272}
          >
            <div className={styles.logo}>
              <Link to="/">
                <img src="https://gw.alipayobjects.com/zos/rmsportal/osjtaBtmmQzWRvMbcKeb.svg" alt="logo" />
                <h1>Ant Design Pro</h1>
              </Link>
            </div>
            <Menu
              theme="dark"
              mode="inline"
              defaultOpenKeys={this.getDefaultCollapsedSubMenus()}
              selectedKeys={this.getCurrentMenuSelectedKeys()}
              style={{ margin: '24px 0' }}
            >
              {this.getNavMenuItems(menus)}
            </Menu>
          </Sider>
          <Layout>
            <Header className={styles.header}>
              <Icon
                className={styles.trigger}
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <div className={styles.right}>
                <HeaderSearch className={styles.action} placeholder="站内搜索" />
                <NotificationIcon className={styles.action} count={currentUser.notifyCount} />
                <Dropdown overlay={menu}>
                  <span className={styles.account}>
                    <Avatar size="small" className={styles.avatar} src={currentUser.avatar} />
                    {currentUser.name}
                  </span>
                </Dropdown>
              </div>
            </Header>
            <Content style={{ margin: 24, height: '100%' }}>
              {children}
              <GlobalFooter
                links={[{
                  title: '帮助',
                  href: '',
                }, {
                  title: '隐私',
                  href: '',
                }, {
                  title: '条款',
                  href: '',
                  blankTarget: true,
                }]}
                copyright={<div>Copyright <Icon type="copyright" /> 2017 蚂蚁金服体验技术部出品</div>}
              />
            </Content>
          </Layout>
        </Layout>
      </DocumentTitle>
    );
  }
}

export default connect(state => ({
  currentUser: state.user.currentUser,
  collapsed: state.global.collapsed,
}))(BasicLayout);
