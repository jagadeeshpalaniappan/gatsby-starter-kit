import React from 'react';
import { graphql } from 'gatsby';
import dayjs from 'dayjs';

import '../../../../mynpms/react-website-themes/packages/diary/src/styles/variables';
import '../../../../mynpms/react-website-themes/packages/diary/src/styles/global';

import HomeIcon from 'react-feather/dist/icons/home';
import CalendarIcon from 'react-feather/dist/icons/calendar';
import ArrowRightIcon from 'react-feather/dist/icons/arrow-right';
import ClockIcon from 'react-feather/dist/icons/clock';
import ArrowUpIcon from 'react-feather/dist/icons/arrow-up';
import SkipForwardIcon from 'react-feather/dist/icons/skip-forward';

import Branding from '../../../../mynpms/react-website-themes/packages/diary/src/components/Branding';
import Footer from '../../../../mynpms/react-website-themes/packages/diary/src/components/Footer';
import Header from '../../../../mynpms/react-website-themes/packages/diary/src/components/Header';
import Menu from '../../../../mynpms/react-website-themes/packages/diary/src/components/Menu';
import Blog from '../../../../mynpms/react-website-themes/packages/diary/src/components/Blog';
import Layout from '../../../../mynpms/react-website-themes/packages/diary/src/components/Layout';
import Seo from '../../../../mynpms/react-website-themes/packages/diary/src/components/Seo';
import Pagination from '../../../../mynpms/react-website-themes/packages/diary/src/components/Pagination';

import config from 'content/meta/config';
import logo from 'content/images/logo.png';
import menuItems from 'content/meta/menu';

const blogIcons = {
  post: CalendarIcon,
  arrow: ArrowRightIcon,
  time: ClockIcon,
};

const actionIcons = {
  toTop: ArrowUpIcon,
};

const paginationIcons = {
  home: HomeIcon,
  last: SkipForwardIcon,
};

class IndexPage extends React.Component {
  state = {
    prevVisit: null,
  };

  componentDidMount() {
    if (typeof localStorage !== 'undefined') {
      const lastVisitDay = localStorage.getItem('lastVisitDay');
      const prevVisitDay = localStorage.getItem('prevVisitDay');
      const todayDay = dayjs().format('YYYY-MM-DD');

      if (!lastVisitDay) {
        localStorage.setItem('lastVisitDay', todayDay);
      } else {
        if (dayjs(todayDay).isAfter(dayjs(lastVisitDay))) {
          localStorage.setItem('lastVisitDay', todayDay);
          localStorage.setItem('prevVisitDay', lastVisitDay);
          this.setState({ prevVisit: lastVisitDay });
        } else {
          this.setState({ prevVisit: prevVisitDay });
        }
      }
    }
  }

  render() {
    const { prevVisit } = this.state;

    const {
      pageContext: { items, pageIndex, numberOfPages },
      data: {
        footerLinks: { html: footerLinksHTML },
        copyright: { html: copyrightHTML },
      },
    } = this.props;

    const {
      headerTitle,
      headerSubTitle,
      siteUrl,
      siteTitle,
      siteDescription,
      siteLanguage,
      city,
    } = config;

    return (
      <Layout>
        <Header>
          <Branding title={headerTitle} subTitle={headerSubTitle} logo={logo} />
          <Menu items={menuItems} actionIcons={actionIcons} />
        </Header>
        <Blog
          items={items}
          author={'greg'}
          icons={blogIcons}
          prevVisit={prevVisit}
          location={city}
          limit={10}
        />
        <Pagination
          pageIndex={pageIndex}
          numberOfPages={numberOfPages}
          icons={paginationIcons}
        />
        <Footer links={footerLinksHTML} copyright={copyrightHTML} />
        <Seo
          url={siteUrl}
          language={siteLanguage}
          title={siteTitle}
          description={siteDescription}
        />
      </Layout>
    );
  }
}

export default IndexPage;

export const query = graphql`
  query {
    footerLinks: markdownRemark(
      fileAbsolutePath: { regex: "/content/parts/footerLinks/" }
    ) {
      html
    }
    copyright: markdownRemark(
      fileAbsolutePath: { regex: "/content/parts/copyright/" }
    ) {
      html
    }
  }
`;
