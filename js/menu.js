/**
 * Created by stefan on 09-06-2020.
 * 
 */

(function () {
    'use strict';
  
    var openBtn = document.querySelector('.c-hamburger-btn');    
    var closeBtn = document.querySelector('.js-close-menu');    
    var menuOverlay = document.querySelector('.r-menu-overlay');    
    var openmenu = document.querySelector('.r-menu-overlay');
  
    // console.log(contactOverlay);
  
    /** 
     *  Functions
    */
  
    function closeMenu() {
      menuOverlay.classList.remove('r-menu-overlay--visible');
    }

    function openMenu() {
      menuOverlay.classList.toggle('r-menu-overlay--visible');
    }
 
    openBtn.addEventListener('click', openMenu);  
    closeBtn.addEventListener('click', closeMenu);    
    // openmenu.addEventListener('click', () => setTimeout(closeMenu, 500));
  
  })();