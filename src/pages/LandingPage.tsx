import React, { useEffect, useState } from 'react';

import { Navbar, NavbarOptionEnum } from 'src/components/Navbar/Navbar';
import { SportsDBService } from 'src/service';
import styles from './LandingPage.module.css';

export const LandingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teamData, setTeamData] = useState<SportsDBService.SportsDBDataModel>(
    {} as SportsDBService.SportsDBDataModel,
  );

  useEffect(() => {
    initializeLandingPage();
  }, []);

  const initializeLandingPage = async () => {
    const data = await SportsDBService.fetchTeamData('KNICKS');
    setIsLoading(false);
    setTeamData(data);
  };

  return (
    isLoading ?
      (
        <div>
          ...loading
        </div>
      ) :
      (
        <>
          <Navbar />
          <div
            className={styles.backgroundContainer}
            style={{
              backgroundImage: `url(${teamData.strTeamFanart4})` }
            }>
          </div>
          <div className={styles.pageContainer}>
            <article
              id={NavbarOptionEnum.Description} className="knicks-description">
              <section className="knicks-description__header">
              The Knicks
              </section>
              <section className={styles.teamDescriptionBody}>
                {teamData.strDescriptionEN}
              </section>
            </article>

            <hr />
            <article
              id={NavbarOptionEnum.MSG}
              className="msg-description">
              <section className="msg-description__header">
                {teamData.strStadium}
              </section>
              <section className="msg-description__body">
                {teamData.strStadiumDescription}
              </section>
            </article>
            <hr />

            <div
              id={NavbarOptionEnum.Merch}
              className="merch-container">
              <div>
                <img src={teamData.strTeamJersey} alt="" />
              </div>
              <div className="merchandise">
                <a href="https://shop.msg.com/">Check out our Merch</a>
              </div>
            </div>
          </div>
        </>
      )
  );
};
