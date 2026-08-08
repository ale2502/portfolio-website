import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
import CodeRain from './CodeRain';
import NavDrawer from './NavDrawer';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function Layout() {
  const smoothWrapperRef = useRef(null);

  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: smoothWrapperRef.current,
      content: '#smooth-content',
      smooth: 1.4,
      effects: true,
    });
  });

  return (
    <div id="smooth-wrapper" ref={smoothWrapperRef}>
      <CodeRain />
      <NavDrawer />
      <div id="smooth-content">
        <div className="layout">
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
