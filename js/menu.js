/**
 * Created by stefan on 09-11-2020.
 * 
 */

(function () {
    'use strict';
  
    var openBtn = document.querySelector('.c-hamburger-btn');    
    var closeBtn = document.querySelector('.js-close-menu');    
    var menuOverlay = document.querySelector('.r-menu-overlay');    
    var menuLink = document.querySelector('.r-menu-overlay__link');
  
    // console.log(menuLink);
  
    /** 
     *  Functions
    */
  
    function closeMenu() {
      menuOverlay.classList.toggle('r-menu-overlay--visible');
    }

    function openMenu() {
      menuOverlay.classList.toggle('r-menu-overlay--visible');
    }
 
    openBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    menuLink.addEventListener('click', closeMenu);
  
  })();