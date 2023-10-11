import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import styled from 'styled-components';

import { useCurrentComponentStore } from '@/stores/current-component';
import { recordMouseEnter } from '@/utils/analytics';

import { CurrentComponent } from '../CurrentComponent';
import { navigationCategories } from '../navigation-categories';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  z-index: 1;
  flex-grow: 1;
  padding: 0 1rem;
  height: var(--nav-height);
`;

const NavRoot = styled(NavigationMenu.Root)`
  height: 100%;

  > div {
    height: 100%;
  }
`;

const NavList = styled(NavigationMenu.List)`
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
`;

const NavItem = styled(NavigationMenu.Item)`
  display: flex;
  align-items: center;
  position: relative;
  height: 100%;
`;

const NavTrigger = styled(NavigationMenu.Trigger)`
  all: unset;
  font: var(--text-s);
  color: var(--sand12);
  font-weight: 600;
  padding: 0 1rem;
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 100px;
  transition: all 200ms;

  &:hover,
  &:focus,
  &[data-state='open'] {
    background: var(--sand4);
  }
`;

const NavContent = styled(NavigationMenu.Content)`
  position: absolute;
  top: calc(100% - 1rem + 1px);
  left: 0;
  padding-top: 1rem;
  transform-origin: center top;
  animation: fadeIn 200ms;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(1, 0.5);
    }
    to {
      opacity: 1;
      transform: scale(1, 1);
    }
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 16px 0;
  transform-origin: center top;
  background: var(--white);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.06);
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
`;

const NavLink = styled(NavigationMenu.Link)`
  display: inline-block;
  min-width: 120px;
  padding: 7px 0;
  font: var(--text-s);
  color: var(--sand12);
  transition: color 200ms;
  white-space: nowrap;
  outline: none;

  &:hover,
  &:focus {
    color: var(--sand12);
    text-decoration: underline;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 24px 0;
  gap: 24px;
  border-right: 1px solid var(--sand4);

  &:first-child:last-child {
    border-right: none;
  }
`;

const CurrentComponentSection = styled.div`
  padding: 0 24px 0;
`;

const SectionTitle = styled.p`
  font: var(--text-xs);
  color: var(--sand10);
  font-weight: 450;
  padding: 12px 0;
  letter-spacing: 0.24px;
  margin: 0;
`;

export const MainNavigationMenu = () => {
  const currentComponentSrc = useCurrentComponentStore((store) => store.src);

  return (
    <Wrapper>
      <NavRoot delayDuration={0}>
        <NavList>
          {navigationCategories
            .filter((category) => category.visible === 'all' || category.visible === 'desktop')
            .map((category) => (
              <NavItem key={category.title}>
                <NavTrigger onMouseEnter={recordMouseEnter}>{category.title}</NavTrigger>

                <NavContent>
                  <Container>
                    <Section>
                      {category.sections.map((section) => (
                        <div key={section.title}>
                          {section.title && <SectionTitle>{section.title}</SectionTitle>}

                          {section.links.map((link) => (
                            <NavLink key={link.title} asChild>
                              <Link href={link.url} target={link.url.indexOf('http') === 0 ? '_blank' : undefined}>
                                {link.title}
                              </Link>
                            </NavLink>
                          ))}
                        </div>
                      ))}
                    </Section>

                    {currentComponentSrc && category.title === 'Develop' && (
                      <CurrentComponentSection>
                        <CurrentComponent />
                      </CurrentComponentSection>
                    )}
                  </Container>
                </NavContent>
              </NavItem>
            ))}
        </NavList>
      </NavRoot>
    </Wrapper>
  );
};
