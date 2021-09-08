import React from 'react';

import styles from './Navbar.module.css';

export enum NavbarOptionEnum {
  'Description' = 'Description',
  'MSG' = 'MSG',
  // 'Roster' = 'Roster',
  'Merch' = 'Merch',
  // 'Social Media' = 'Social Media'
}

export const NAVBAR_OPTIONS = [
  NavbarOptionEnum.Description,
  NavbarOptionEnum.MSG,
  // NavbarOptionEnum.Roster,
  NavbarOptionEnum.Merch,
  // NavbarOptionEnum['Social Media']
];

export const Navbar = () => {
  return (
    <aside className={styles.navbarContainer}>
      {
        NAVBAR_OPTIONS.map((menuItem) => {
          return (
            <div
              className={styles.navbarMenuItem}
              key={menuItem}>
              <a href={`#${menuItem}`}>{menuItem}</a>
            </div>
          );
        })
      }
    </aside>
  );
};
