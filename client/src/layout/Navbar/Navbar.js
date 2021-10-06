import MenuItems from './MenuItems';
import { withRouter } from 'react-router-dom';
import MenuButton from './MenuButton';
import { Layout } from 'antd';
import auth from '../../modules/auth/auth-helper';

const { Header } = Layout;

const Navbar = withRouter(({ history }) => (
  <>
    {auth.isAuthenticated() && <Header>
      <nav>
        <MenuButton history={history} />
        <div className='menu-items-container'>
          <div className='logo'>Logo</div>
          <MenuItems history={history} className="links-container_horizontal" />
        </div>
      </nav>
    </Header>}
  </>

));

export default Navbar;
