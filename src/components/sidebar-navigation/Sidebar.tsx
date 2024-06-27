import Image from 'next/image';
import { useRouter } from 'next/router';

import { Tooltip } from '../lib/Tooltip';
import NearIconSvg from './icons/near-icon.svg';
import { LargeScreenProfileDropdown } from './LargeScreenProfileDropdown';
import { Search } from './Search';
import { useNavigationStore } from './store';
import * as S from './styles';
import { currentPathMatchesRoute } from './utils';

export const Sidebar = () => {
  const router = useRouter();
  const expandedDrawer = useNavigationStore((store) => store.expandedDrawer);
  const isSidebarExpanded = useNavigationStore((store) => store.isSidebarExpanded && !store.expandedDrawer);
  const isOpenedOnSmallScreens = useNavigationStore((store) => store.isOpenedOnSmallScreens);
  const toggleExpandedSidebar = useNavigationStore((store) => store.toggleExpandedSidebar);
  const handleBubbledClickInSidebar = useNavigationStore((store) => store.handleBubbledClickInSidebar);
  const tooltipsDisabled = isSidebarExpanded;

  const isNavigationItemActive = (route: string | string[], exactMatch = false) => {
    if (expandedDrawer) return false;
    return currentPathMatchesRoute(router.asPath, route, exactMatch);
  };

  return (
    <S.Sidebar
      $openedOnSmallScreens={isOpenedOnSmallScreens}
      $expanded={isSidebarExpanded}
      onClick={(event) => handleBubbledClickInSidebar(event)}
    >
      <S.OverflowContainChild>
        <S.Top>
          <S.Logo href="/" aria-label="Go Home">
            <Image src={NearIconSvg} alt="NEAR" />
          </S.Logo>

          <S.ToggleExpandButton type="button" aria-label="Expand/Collapse Menu" onClick={toggleExpandedSidebar}>
            <i className={`ph-bold ${isSidebarExpanded ? 'ph-arrow-line-left' : 'ph-list'}`} />
          </S.ToggleExpandButton>
        </S.Top>

        <S.SearchSection $expanded={isSidebarExpanded}>
          <Search />
          <S.SearchIconWrapper $expanded={isSidebarExpanded}>
            <i className="ph-bold ph-magnifying-glass" />
          </S.SearchIconWrapper>
        </S.SearchSection>

        <S.Section>
          <S.Stack $gap="0.5rem">
            <Tooltip content="Home" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={isNavigationItemActive('/', true)} $type="featured" href="/">
                <i className="ph-bold ph-house" />
                <span>Home</span>
              </S.NavigationItem>
            </Tooltip>

            <Tooltip content="Documentation" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem
                $active={isNavigationItemActive('/documentation')}
                $type="featured"
                href="/documentation"
              >
                <i className="ph-bold ph-book-open-text" />
                <span>Documentation</span>
              </S.NavigationItem>
            </Tooltip>

            <Tooltip content="Support" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={isNavigationItemActive('/contact-us')} $type="featured" href="/contact-us">
                <i className="ph-bold ph-question" />
                <span>Support</span>
              </S.NavigationItem>
            </Tooltip>
          </S.Stack>
        </S.Section>

        <S.Section>
          <S.SectionLabel>Discover </S.SectionLabel>

          <S.Stack $gap="0.5rem">
            <Tooltip content="Applications" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={isNavigationItemActive('/applications')} $type="featured" href="/applications">
                <i className="ph-bold ph-shapes" />
                <span>Applications</span>
              </S.NavigationItem>
            </Tooltip>

            <Tooltip content="Events" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={false} $type="featured" href="https://near.org/events" target="_blank">
                <i className="ph-calendar ph-bold" />
                <span>Events</span>
                <span className="ph-bold ph-arrow-square-out ms-auto outline-none" />
              </S.NavigationItem>
            </Tooltip>

            <Tooltip content="News" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem
                $active={isNavigationItemActive('/nearweekapp.near/widget/nearweek.com')}
                $type="featured"
                href="/nearweekapp.near/widget/nearweek.com"
              >
                <i className="ph-newspaper ph-bold" />
                <span>News</span>
              </S.NavigationItem>
            </Tooltip>

            <Tooltip content="Blog" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={false} $type="featured" href="https://near.org/blog" target="_blank">
                <i className="ph-bold ph-chat-centered-text" />
                <span>Blog</span>
                <span className="ph-bold ph-arrow-square-out ms-auto outline-none" />
              </S.NavigationItem>
            </Tooltip>
          </S.Stack>
        </S.Section>

        <S.Section style={{ flexGrow: 1 }}>
          <S.SectionLabel>Resources </S.SectionLabel>

          <S.Stack $gap="0.5rem">
            <Tooltip content="Standards & Proposals" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={false} $type="featured" href="https://github.com/near/NEPs" target="_blank">
                <i className="ph-file-text ph-bold" />
                <span>Standards & Proposals</span>
                <span className="ph-bold ph-arrow-square-out ms-auto outline-none" />
              </S.NavigationItem>
            </Tooltip>

            <Tooltip content="GitHub" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={false} $type="featured" href="https://github.com/near" target="_blank">
                <i className="ph-bold ph-github-logo" />
                <span>GitHub</span>
                <span className="ph-bold ph-arrow-square-out ms-auto outline-none" />
              </S.NavigationItem>
            </Tooltip>

            <Tooltip content="Careers" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem $active={false} $type="featured" href="https://careers.near.org/" target="_blank">
                <i className="ph-bold ph-briefcase" />
                <span>Careers</span>
                <span className="ph-bold ph-arrow-square-out ms-auto outline-none" />
              </S.NavigationItem>
            </Tooltip>

            <Tooltip content="Get Funding" side="right" disabled={tooltipsDisabled}>
              <S.NavigationItem
                $active={isNavigationItemActive('/ecosystem/get-funding')}
                $type="featured"
                href="/ecosystem/get-funding"
              >
                <i className="ph-bold ph-coin-vertical" />
                <span>Get Funding</span>
              </S.NavigationItem>
            </Tooltip>
          </S.Stack>
        </S.Section>

        <S.ProfileDropdownSection $expanded={isSidebarExpanded}>
          <LargeScreenProfileDropdown />
        </S.ProfileDropdownSection>
      </S.OverflowContainChild>
    </S.Sidebar>
  );
};
