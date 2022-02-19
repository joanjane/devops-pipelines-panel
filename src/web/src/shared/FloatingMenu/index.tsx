import './index.scss';
import { FC, useState } from 'react';

export const FloatingMenu: FC<{}> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={`app-floating-menu ${collapsed ? 'app-floating-menu--opened' : 'app-floating-menu--closed'}`}>
      <div>
        <button type="button" className="app-action-btn" onClick={() => setCollapsed(s => !s)}>
          {collapsed ?
            <span className="app-action-btn__cross">×</span> :
            <span className="app-action-btn__hamburger">🍔</span>
          }
        </button>
      </div>
      <div className="app-floating-menu__content">
        {children}
      </div>
    </div>
  );
};
