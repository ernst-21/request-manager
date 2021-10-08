import MenuItems from './MenuItems';
import { withRouter } from 'react-router-dom';
import MenuButton from './MenuButton';
import { Layout } from 'antd';
import auth from '../../modules/auth/auth-helper';
import NavigationTabs from '../../modules/travelers/components/NavigationTabs';
import TravelersSearchBar from './TravelersSearchBar';

const { Header } = Layout;

const Navbar = withRouter(({ history }) => (
  <>
    {auth.isAuthenticated() && <Header>
      <nav>
        <MenuButton history={history} />
        <div className='menu-items-container'>
          <div className='logo-search__container'>
            <div className='logo'>Request Manager</div>
            <TravelersSearchBar />
          </div>
          <MenuItems history={history} className="links-container_horizontal" />
        </div>
      </nav>
    </Header>
    }
    {auth.isAuthenticated() && <NavigationTabs />}
  </>
));

export default Navbar;
